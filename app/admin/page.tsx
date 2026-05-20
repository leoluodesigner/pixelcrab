import type { Metadata } from 'next';
import { getAllGames, getPendingContent, getSourcesForGame } from '@/lib/content';
import { hasSupabaseConfig } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Admin Review Queue',
  description: 'Review imported and manually submitted Pixelcrab content before publishing.'
};

export default function AdminPage() {
  const pending = getPendingContent();
  const [game] = getAllGames();
  const sources = getSourcesForGame(game.id);
  const connected = hasSupabaseConfig();

  return (
    <div className="container admin-layout">
      <section className="section-header">
        <div>
          <h1 className="section-title">Admin review queue</h1>
          <p className="section-kicker">MVP shell for human approval before content is published.</p>
        </div>
        <span className="status-pill">{connected ? 'Supabase configured' : 'Local seed mode'}</span>
      </section>

      <div className="admin-grid">
        <div className="admin-panel">
          <h2 className="card-title">Pending content</h2>
          {pending.length === 0 ? (
            <p className="card-summary">No pending items in the local seed data.</p>
          ) : (
            <ul>
              {pending.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="card-summary">{item.source} · {item.language.toUpperCase()} · {item.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-panel">
          <h2 className="card-title">Source setup</h2>
          <ul>
            {sources.map((source) => (
              <li key={source.id}>
                <strong>{source.label}</strong>
                <br />
                <span className="card-summary">{source.enabled ? 'Automated import candidate' : 'Manual MVP input'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="admin-panel" style={{ marginTop: 24 }}>
        <h2 className="card-title">Backend wiring checklist</h2>
        <ul>
          <li>Apply `supabase/migrations/0001_pixelcrab_mvp.sql` in Supabase.</li>
          <li>Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in Vercel.</li>
          <li>Run `npm run import:steam -- --appid=3526710 --game=everything-is-crab` to create pending Steam items.</li>
          <li>Run `npm run import:youtube -- --query="Everything is Crab guide" --game=everything-is-crab` for YouTube pending items.</li>
        </ul>
      </section>
    </div>
  );
}
