-- EloPhanto.com Supabase Database Schema
-- Run this in your Supabase SQL editor to set up all required tables.

-- Enable pgvector extension (for future embedding dedup)
create extension if not exists vector;

-- Agent registration + API keys
create table agent_keys (
  id uuid primary key default gen_random_uuid(),
  agent_id text unique not null,
  api_key text unique not null,
  agent_version text,
  created_at timestamptz default now(),
  last_seen_at timestamptz,
  is_active boolean default true
);

-- Training example staging buffer
create table collect_buffer (
  id uuid primary key default gen_random_uuid(),
  agent_id text references agent_keys(agent_id),
  task_id text not null,
  conversations jsonb not null,
  metadata jsonb not null,
  embedding vector(384),
  status text default 'pending',
  rejection_reason text,
  created_at timestamptz default now()
);

-- Push history (tracks daily pushes to HuggingFace)
create table collect_log (
  id uuid primary key default gen_random_uuid(),
  examples_pushed int not null,
  dataset_size_after int not null,
  hf_commit_sha text,
  pushed_at timestamptz default now()
);

-- Skill download counter
create table download_counts (
  skill_name text not null,
  date date not null default current_date,
  count int default 0,
  primary key (skill_name, date)
);

-- Skill reports (malicious/suspicious)
create table skill_reports (
  id uuid primary key default gen_random_uuid(),
  skill_name text not null,
  reporter text,
  reason text not null,
  details text,
  status text default 'open',
  created_at timestamptz default now()
);

-- Indexes for performance
create index idx_collect_buffer_status on collect_buffer(status);
create index idx_collect_buffer_agent on collect_buffer(agent_id);
create index idx_collect_buffer_task on collect_buffer(task_id);
create index idx_download_counts_skill on download_counts(skill_name);
create index idx_skill_reports_skill on skill_reports(skill_name);
create index idx_skill_reports_status on skill_reports(status);
create index idx_agent_keys_api_key on agent_keys(api_key);

-- RPC for atomic download count increment
create or replace function increment_download_count(
  p_skill_name text,
  p_date date
) returns void as $$
begin
  insert into download_counts (skill_name, date, count)
  values (p_skill_name, p_date, 1)
  on conflict (skill_name, date)
  do update set count = download_counts.count + 1;
end;
$$ language plpgsql;
