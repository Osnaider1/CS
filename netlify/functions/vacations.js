import { getStore } from '@netlify/blobs';

const STORE_NAME = 'vacaciones';
const KEY = 'data.json';

export async function handler(event) {
  const store = getStore({ name: STORE_NAME, consistency: 'strong' });

  try {
    if (event.httpMethod === 'GET') {
      const json = await store.getJSON(KEY);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json || { members: [], vacations: [] })
      };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const current = (await store.getJSON(KEY)) || { members: [], vacations: [] };

      if (body.type === 'add-member') {
        const name = String(body.payload?.name || '').trim();
        if (name && !current.members.includes(name)) current.members.push(name);
      }

      if (body.type === 'save-vacation') {
        const v = body.payload;
        if (!v.id) v.id = Date.now();
        const idx = current.vacations.findIndex(x => x.id === v.id);
        if (idx >= 0) current.vacations[idx] = v;
        else current.vacations.push(v);
      }

      if (body.type === 'delete-vacation') {
        const id = body.payload?.id;
        current.vacations = current.vacations.filter(x => x.id !== id);
      }

      await store.setJSON(KEY, current);
      return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Server Error' };
  }
}
