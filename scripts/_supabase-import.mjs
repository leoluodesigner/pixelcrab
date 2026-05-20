import { createClient } from '@supabase/supabase-js';

export function getArg(name, fallback = undefined) {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

export function slugify(input) {
  return input
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

export function stripHtml(input = '') {
  return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL/SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function upsertPendingItems(items) {
  if (items.length === 0) {
    console.log('No items to import.');
    return;
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from('content_items')
    .upsert(items, { onConflict: 'game_id,source_url', ignoreDuplicates: false })
    .select('id,title,status,source_url');

  if (error) {
    throw error;
  }

  console.table(data);
}
