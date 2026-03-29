import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-token, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

async function verifyToken(token: string): Promise<boolean> {
  try {
    const sessionSecret = Deno.env.get('ADMIN_SESSION_SECRET');
    if (!sessionSecret) return false;

    const decoded = atob(token);
    const [timestamp, sigHex] = decoded.split(':');
    if (!timestamp || !sigHex) return false;

    // Token expires after 24 hours
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > 24 * 60 * 60 * 1000) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(sessionSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const expectedSig = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
    const expectedHex = Array.from(new Uint8Array(expectedSig)).map(b => b.toString(16).padStart(2, '0')).join('');

    return sigHex === expectedHex;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const token = req.headers.get('x-admin-token');
  if (!token || !(await verifyToken(token))) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const url = new URL(req.url);
    const table = url.searchParams.get('table');
    const id = url.searchParams.get('id');

    const validTables = ['achadinhos', 'promocoes', 'favoritos', 'avisos', 'site_content'];
    if (!table || !validTables.includes(table)) {
      return new Response(JSON.stringify({ error: 'Tabela inválida' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let result;

    switch (req.method) {
      case 'GET': {
        if (id) {
          result = await supabase.from(table).select('*').eq('id', id).single();
        } else {
          result = await supabase.from(table).select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
        }
        break;
      }
      case 'POST': {
        const body = await req.json();
        // Sanitize: remove any fields not expected
        delete body.id;
        body.updated_at = new Date().toISOString();
        result = await supabase.from(table).insert(body).select().single();
        break;
      }
      case 'PUT': {
        if (!id) {
          return new Response(JSON.stringify({ error: 'ID obrigatório' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const updateBody = await req.json();
        delete updateBody.id;
        updateBody.updated_at = new Date().toISOString();
        result = await supabase.from(table).update(updateBody).eq('id', id).select().single();
        break;
      }
      case 'DELETE': {
        if (!id) {
          return new Response(JSON.stringify({ error: 'ID obrigatório' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        result = await supabase.from(table).delete().eq('id', id);
        break;
      }
      default:
        return new Response(JSON.stringify({ error: 'Método não suportado' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ data: result.data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro interno' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
