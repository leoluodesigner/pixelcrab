create extension if not exists "pgcrypto";

create type content_type as enum ('news', 'guide', 'event');
create type content_source as enum ('steam', 'youtube', 'bilibili', 'official', 'manual');
create type content_status as enum ('draft', 'pending', 'published', 'rejected');
create type content_language as enum ('en', 'zh');

create table public.games (
  id text primary key,
  slug text not null unique,
  title text not null,
  title_zh text,
  steam_app_id integer unique,
  description text,
  description_zh text,
  developer text,
  publisher text,
  release_date date,
  price text,
  cover_image text,
  tags text[] default '{}',
  official_url text,
  steam_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  game_id text not null references public.games(id) on delete cascade,
  source content_source not null,
  label text not null,
  url text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  game_id text not null references public.games(id) on delete cascade,
  slug text not null,
  type content_type not null,
  source content_source not null,
  source_url text not null,
  language content_language not null default 'en',
  status content_status not null default 'pending',
  title text not null,
  title_zh text,
  summary text not null default '',
  cover_image text,
  author text not null default 'Pixelcrab',
  body_html text not null default '',
  video_url text,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (game_id, source_url),
  unique (game_id, type, slug)
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  status content_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.games enable row level security;
alter table public.sources enable row level security;
alter table public.content_items enable row level security;
alter table public.profiles enable row level security;
alter table public.comments enable row level security;

create policy "Published games are public" on public.games
  for select using (true);

create policy "Published content is public" on public.content_items
  for select using (status = 'published');

create policy "Sources are public readable" on public.sources
  for select using (true);

create policy "Profiles are self readable" on public.profiles
  for select using (auth.uid() = id);

create policy "Published comments are public" on public.comments
  for select using (status = 'published');

create policy "Users can insert own pending comments" on public.comments
  for insert with check (auth.uid() = author_id and status = 'pending');

create policy "Users can update own pending comments" on public.comments
  for update using (auth.uid() = author_id and status = 'pending');

create policy "Admins can manage games" on public.games
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

create policy "Admins can manage sources" on public.sources
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

create policy "Admins can manage content" on public.content_items
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

create policy "Admins can moderate comments" on public.comments
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

insert into public.games (
  id, slug, title, title_zh, steam_app_id, description, description_zh,
  developer, publisher, release_date, price, cover_image, tags, official_url, steam_url
) values (
  'everything-is-crab',
  'everything-is-crab',
  'Everything is Crab',
  '万物皆可蟹：动物进化',
  3526710,
  'Roguelite action game where everything is a crab.',
  '围绕动物进化构筑的像素风轻量肉鸽动作游戏。',
  'Odd Dreams Digital',
  'Secret Mode',
  '2026-05-08',
  '$9.99',
  '/steam-scrape/images/content_1.jpg',
  array['Roguelite', 'Action', 'Pixel', 'Evolution'],
  'https://www.secretmode.games/games/everything-is-crab/',
  'https://store.steampowered.com/app/3526710/'
) on conflict (id) do nothing;

insert into public.sources (game_id, source, label, url, enabled) values
  ('everything-is-crab', 'steam', 'Steam Announcements', 'https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=3526710', true),
  ('everything-is-crab', 'youtube', 'YouTube Guides', 'https://www.googleapis.com/youtube/v3/search', true),
  ('everything-is-crab', 'bilibili', 'Bilibili Manual Queue', 'https://search.bilibili.com/all?keyword=万物皆可蟹 攻略', false);
