import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  LogOut, Pencil, Trash2, Save, Plus, Image, Type, Link as LinkIcon,
  BadgeCheck, Star, MessageCircle, Instagram, Sparkles, Tag, Heart, Handshake,
  X, Check, AlertCircle
} from 'lucide-react';
import heroImg from '@/assets/adriele-hero.jpg';
import img1 from '@/assets/curadoria-1.jpg';
import img2 from '@/assets/curadoria-2.jpg';
import img3 from '@/assets/curadoria-3.jpg';
import favImg from '@/assets/favorito.jpg';

type ContentItem = Record<string, unknown>;
type EditTarget = {
  type: 'site_content' | 'achadinhos' | 'promocoes' | 'favoritos' | 'avisos';
  item: ContentItem;
  isNew?: boolean;
  label: string;
  fields: FieldDef[];
};
type FieldDef = { key: string; label: string; type: 'text' | 'textarea' | 'url' | 'toggle' | 'number' };

const Admin = () => {
  const { isAuthenticated, isLoading, logout, adminFetch } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [siteContent, setSiteContent] = useState<Record<string, ContentItem>>({});
  const [achadinhos, setAchadinhos] = useState<ContentItem[]>([]);
  const [promocoes, setPromocoes] = useState<ContentItem[]>([]);
  const [favoritos, setFavoritos] = useState<ContentItem[]>([]);
  const [avisos, setAvisos] = useState<ContentItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [editData, setEditData] = useState<ContentItem>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/admin/login');
  }, [isAuthenticated, isLoading, navigate]);

  const loadAll = useCallback(async () => {
    if (!isAuthenticated) return;
    setDataLoading(true);
    try {
      const [sc, ach, pro, fav, avi] = await Promise.all([
        adminFetch('site_content'),
        adminFetch('achadinhos'),
        adminFetch('promocoes'),
        adminFetch('favoritos'),
        adminFetch('avisos'),
      ]);
      const scMap: Record<string, ContentItem> = {};
      (sc || []).forEach((item: ContentItem) => { scMap[item.section_key as string] = item; });
      setSiteContent(scMap);
      setAchadinhos(ach || []);
      setPromocoes(pro || []);
      setFavoritos(fav || []);
      setAvisos(avi || []);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Sessão expirada') navigate('/admin/login');
      else toast({ title: 'Erro ao carregar dados', variant: 'destructive' });
    }
    setDataLoading(false);
  }, [isAuthenticated, adminFetch, navigate, toast]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const openEdit = (target: EditTarget) => {
    setEditTarget(target);
    setEditData({ ...target.item });
  };

  const handleSave = async () => {
    if (!editTarget) return;
    setSaving(true);
    try {
      if (editTarget.isNew) {
        await adminFetch(editTarget.type, 'POST', undefined, editData);
        toast({ title: 'Criado com sucesso! ✨' });
      } else {
        await adminFetch(editTarget.type, 'PUT', editData.id as string, editData);
        toast({ title: 'Salvo com sucesso! ✅' });
      }
      setEditTarget(null);
      loadAll();
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!editTarget || editTarget.isNew) return;
    if (!confirm('Tem certeza que deseja remover este item?')) return;
    setSaving(true);
    try {
      await adminFetch(editTarget.type, 'DELETE', editData.id as string);
      toast({ title: 'Removido com sucesso' });
      setEditTarget(null);
      loadAll();
    } catch {
      toast({ title: 'Erro ao remover', variant: 'destructive' });
    }
    setSaving(false);
  };

  const sc = (key: string, field: string) => String(siteContent[key]?.[field] || '');

  if (isLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Carregando editor...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  const siteContentFields: FieldDef[] = [
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text' },
    { key: 'content', label: 'Texto', type: 'textarea' },
    { key: 'image_url', label: 'URL da Imagem', type: 'url' },
    { key: 'link', label: 'Link', type: 'url' },
  ];

  const itemFields: FieldDef[] = [
    { key: 'title', label: 'Nome', type: 'text' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'image_url', label: 'URL da Imagem', type: 'url' },
    { key: 'link', label: 'Link do produto', type: 'url' },
    { key: 'price', label: 'Preço', type: 'text' },
    { key: 'active', label: 'Visível no site', type: 'toggle' },
  ];

  const promoFields: FieldDef[] = [
    ...itemFields.slice(0, 5),
    { key: 'original_price', label: 'Preço original', type: 'text' },
    { key: 'active', label: 'Visível no site', type: 'toggle' },
  ];

  const favFields: FieldDef[] = [
    { key: 'title', label: 'Nome', type: 'text' },
    { key: 'description', label: 'Descrição', type: 'textarea' },
    { key: 'image_url', label: 'URL da Imagem', type: 'url' },
    { key: 'link', label: 'Link', type: 'url' },
    { key: 'category', label: 'Categoria', type: 'text' },
    { key: 'is_featured', label: 'Destaque principal', type: 'toggle' },
    { key: 'active', label: 'Visível no site', type: 'toggle' },
  ];

  const avisoFields: FieldDef[] = [
    { key: 'title', label: 'Título do aviso', type: 'text' },
    { key: 'content', label: 'Texto do aviso', type: 'textarea' },
    { key: 'active', label: 'Visível no site', type: 'toggle' },
  ];

  const EditableBlock = ({ children, label, onClick, className = '' }: {
    children: React.ReactNode; label: string; onClick: () => void; className?: string;
  }) => (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer rounded-2xl transition-all duration-200 hover:ring-2 hover:ring-[hsl(var(--gold))] hover:ring-offset-2 hover:ring-offset-background ${className}`}
    >
      {children}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground/80 text-background text-[10px] font-medium shadow-lg">
          <Pencil size={10} />
          {label}
        </span>
      </div>
    </div>
  );

  const ItemCard = ({ item, type, fields, typeLabel }: {
    item: ContentItem; type: EditTarget['type']; fields: FieldDef[]; typeLabel: string;
  }) => (
    <EditableBlock
      label="Editar"
      onClick={() => openEdit({ type, item, label: `Editar ${typeLabel}`, fields })}
    >
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        {item.image_url ? (
          <img src={String(item.image_url)} alt="" className="w-full aspect-square object-cover" />
        ) : (
          <div className="w-full aspect-square bg-muted flex items-center justify-center">
            <Image size={24} className="text-muted-foreground/40" />
          </div>
        )}
        <div className="p-3">
          <p className="text-sm font-medium text-foreground truncate">{String(item.title || 'Sem título')}</p>
          {item.price && <p className="text-xs text-[hsl(var(--gold))] mt-0.5">{String(item.price)}</p>}
          {!item.active && (
            <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground/60">
              <AlertCircle size={10} /> Oculto
            </span>
          )}
        </div>
      </div>
    </EditableBlock>
  );

  const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="rounded-2xl border-2 border-dashed border-border hover:border-[hsl(var(--gold))] bg-card/50 hover:bg-card flex flex-col items-center justify-center gap-2 p-6 transition-all aspect-square"
    >
      <Plus size={20} className="text-muted-foreground" />
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </button>
  );

  const newItem = (type: EditTarget['type'], fields: FieldDef[], label: string) => {
    const empty: ContentItem = {};
    fields.forEach(f => {
      if (f.type === 'toggle') empty[f.key] = true;
      else if (f.type === 'number') empty[f.key] = 0;
      else empty[f.key] = '';
    });
    openEdit({ type, item: empty, isNew: true, label: `Novo ${label}`, fields });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background">
        <div className="container max-w-lg mx-auto flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium">Modo Edição</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-background hover:text-background/80 hover:bg-background/10 h-8 text-xs"
            onClick={() => { logout(); navigate('/admin/login'); }}
          >
            <LogOut size={14} className="mr-1" /> Sair
          </Button>
        </div>
      </div>

      <div className="pt-12">
        {/* ═══════ HERO / PROFILE ═══════ */}
        <section className="pt-4">
          <div className="container max-w-lg mx-auto py-8">
            <div className="flex flex-col items-center text-center">
              {/* Photo */}
              <EditableBlock
                label="Editar foto"
                className="mb-5"
                onClick={() => openEdit({
                  type: 'site_content',
                  item: siteContent['hero'] || { section_key: 'hero' },
                  label: 'Foto e textos do perfil',
                  fields: siteContentFields,
                })}
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[hsl(var(--rose))] via-[hsl(var(--gold)/0.5)] to-[hsl(var(--nude))] p-[3px]" />
                  <img
                    src={sc('hero', 'image_url') || heroImg}
                    alt="Adriele Leite"
                    className="relative w-28 h-28 rounded-full object-cover border-[3px] border-background"
                  />
                </div>
              </EditableBlock>

              {/* Name - editable */}
              <EditableBlock
                label="Editar nome"
                className="mb-1"
                onClick={() => openEdit({
                  type: 'site_content',
                  item: siteContent['hero'] || { section_key: 'hero' },
                  label: 'Textos do perfil',
                  fields: siteContentFields,
                })}
              >
                <div className="flex items-center gap-1.5">
                  <h1 className="font-heading text-2xl font-semibold text-foreground">
                    {sc('hero', 'title') || 'Adriele Leite'}
                  </h1>
                  <BadgeCheck size={22} className="text-[hsl(var(--gold))] fill-[hsl(var(--gold))] mt-0.5" />
                </div>
              </EditableBlock>

              {/* Bio text - editable */}
              <EditableBlock
                label="Editar textos"
                className="mb-6"
                onClick={() => openEdit({
                  type: 'site_content',
                  item: siteContent['hero'] || { section_key: 'hero' },
                  label: 'Textos do perfil',
                  fields: siteContentFields,
                })}
              >
                <p className="text-sm font-medium text-muted-foreground tracking-wide mb-2">
                  {sc('hero', 'subtitle') || 'Rotina real, dicas e achadinhos'}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs px-4">
                  {sc('hero', 'content') || 'Aqui eu reúno com carinho tudo o que facilita o dia a dia.'}
                </p>
              </EditableBlock>

              {/* Buttons - editable */}
              <EditableBlock
                label="Editar botões"
                onClick={() => openEdit({
                  type: 'site_content',
                  item: siteContent['hero'] || { section_key: 'hero' },
                  label: 'Botões e links do perfil',
                  fields: [
                    ...siteContentFields,
                    { key: 'link', label: 'Link do WhatsApp', type: 'url' as const },
                  ],
                })}
                className="w-full max-w-xs"
              >
                <div className="flex flex-col w-full gap-2.5">
                  <div className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                    <Sparkles size={16} /> Ver achadinhos
                  </div>
                  <div className="flex gap-2.5">
                    <div className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-medium">
                      <MessageCircle size={16} /> WhatsApp
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl border border-border text-foreground text-sm font-medium">
                      <Instagram size={16} /> Instagram
                    </div>
                  </div>
                </div>
              </EditableBlock>
            </div>
          </div>
        </section>

        {/* ═══════ HIGHLIGHTS ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <div className="flex justify-between gap-2 px-2 opacity-70 pointer-events-none">
              {[
                { icon: Sparkles, label: 'Achadinhos' },
                { icon: Tag, label: 'Promoções' },
                { icon: Heart, label: 'Favoritos' },
                { icon: Instagram, label: 'Instagram' },
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Handshake, label: 'Parcerias' },
              ].map((h) => (
                <div key={h.label} className="flex flex-col items-center gap-1.5 min-w-[50px]">
                  <div className="relative">
                    <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-[hsl(var(--gold)/0.6)] to-[hsl(var(--rose))]" />
                    <div className="relative w-[48px] h-[48px] rounded-full bg-card border-[2px] border-background flex items-center justify-center">
                      <h.icon size={18} className="text-foreground/70" strokeWidth={1.5} />
                    </div>
                  </div>
                  <span className="text-[9px] font-medium text-muted-foreground">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ RECADO ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <EditableBlock
              label="Editar recado"
              onClick={() => openEdit({
                type: 'site_content',
                item: siteContent['recado'] || { section_key: 'recado' },
                label: 'Recado da Adriele',
                fields: siteContentFields,
              })}
            >
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="font-heading text-4xl text-[hsl(var(--gold)/0.25)] leading-none select-none mb-2">"</div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {sc('recado', 'title') || 'Recado da Adriele'}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sc('recado', 'content') || 'Criei esse espaço para reunir meus achadinhos...'}
                </p>
              </div>
            </EditableBlock>
          </div>
        </section>

        {/* ═══════ AVISOS ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertCircle size={16} className="text-[hsl(var(--gold))]" />
                Avisos
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs rounded-full"
                onClick={() => newItem('avisos', avisoFields, 'Aviso')}
              >
                <Plus size={12} className="mr-1" /> Novo
              </Button>
            </div>
            {avisos.length === 0 ? (
              <p className="text-xs text-muted-foreground/50 text-center py-4">Nenhum aviso ainda. Clique em "+ Novo" para criar.</p>
            ) : (
              <div className="space-y-2">
                {avisos.map(a => (
                  <EditableBlock
                    key={a.id as string}
                    label="Editar"
                    onClick={() => openEdit({ type: 'avisos', item: a, label: 'Editar Aviso', fields: avisoFields })}
                  >
                    <div className={`rounded-xl border border-border/50 bg-card p-4 ${!a.active ? 'opacity-50' : ''}`}>
                      <p className="text-sm font-medium text-foreground">{String(a.title || 'Sem título')}</p>
                      {a.content && <p className="text-xs text-muted-foreground mt-1">{String(a.content)}</p>}
                    </div>
                  </EditableBlock>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════ ACHADINHOS ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles size={16} className="text-[hsl(var(--gold))]" />
                Achadinhos
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs rounded-full"
                onClick={() => newItem('achadinhos', itemFields, 'Achadinho')}
              >
                <Plus size={12} className="mr-1" /> Novo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achadinhos.map(item => (
                <ItemCard key={item.id as string} item={item} type="achadinhos" fields={itemFields} typeLabel="Achadinho" />
              ))}
              <AddButton label="Novo achadinho" onClick={() => newItem('achadinhos', itemFields, 'Achadinho')} />
            </div>
          </div>
        </section>

        {/* ═══════ PROMOÇÕES ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <Tag size={16} className="text-[hsl(var(--gold))]" />
                Promoções
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs rounded-full"
                onClick={() => newItem('promocoes', promoFields, 'Promoção')}
              >
                <Plus size={12} className="mr-1" /> Novo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {promocoes.map(item => (
                <ItemCard key={item.id as string} item={item} type="promocoes" fields={promoFields} typeLabel="Promoção" />
              ))}
              <AddButton label="Nova promoção" onClick={() => newItem('promocoes', promoFields, 'Promoção')} />
            </div>
          </div>
        </section>

        {/* ═══════ FAVORITOS ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <Heart size={16} className="text-[hsl(var(--gold))]" />
                Favoritos
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs rounded-full"
                onClick={() => newItem('favoritos', favFields, 'Favorito')}
              >
                <Plus size={12} className="mr-1" /> Novo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {favoritos.map(item => (
                <ItemCard key={item.id as string} item={item} type="favoritos" fields={favFields} typeLabel="Favorito" />
              ))}
              <AddButton label="Novo favorito" onClick={() => newItem('favoritos', favFields, 'Favorito')} />
            </div>
          </div>
        </section>

        {/* ═══════ SELEÇÕES ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <EditableBlock
              label="Editar textos"
              onClick={() => openEdit({
                type: 'site_content',
                item: siteContent['selecoes'] || { section_key: 'selecoes' },
                label: 'Seleções da Semana',
                fields: siteContentFields,
              })}
            >
              <div className="mb-4">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {sc('selecoes', 'title') || 'Seleções da Semana'}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {sc('selecoes', 'subtitle') || 'O que estou indicando esta semana'}
                </p>
              </div>
            </EditableBlock>
            <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden opacity-70 pointer-events-none">
              <img src={img1} alt="" className="w-full aspect-square object-cover" />
              <img src={img2} alt="" className="w-full aspect-square object-cover" />
              <img src={img3} alt="" className="w-full aspect-square object-cover" />
            </div>
          </div>
        </section>

        {/* ═══════ FAVORITO DESTAQUE ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <EditableBlock
              label="Editar destaque"
              onClick={() => openEdit({
                type: 'site_content',
                item: siteContent['favorito_destaque'] || { section_key: 'favorito_destaque' },
                label: 'Favorito da Adriele',
                fields: siteContentFields,
              })}
            >
              <div className="flex items-center gap-2 mb-3">
                <Star size={14} className="text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  {sc('favorito_destaque', 'title') || 'Favorito da Adriele'}
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border/50 bg-card">
                <img src={favImg} alt="" className="w-full aspect-video object-cover" />
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {sc('favorito_destaque', 'subtitle') || 'Difusor de ambiente artesanal'}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sc('favorito_destaque', 'content') || 'Esse é meu queridinho da semana.'}
                  </p>
                </div>
              </div>
            </EditableBlock>
          </div>
        </section>

        {/* ═══════ SOBRE ═══════ */}
        <section className="py-6 bg-card/50">
          <div className="container max-w-lg mx-auto">
            <EditableBlock
              label="Editar sobre"
              onClick={() => openEdit({
                type: 'site_content',
                item: siteContent['sobre'] || { section_key: 'sobre' },
                label: 'Sobre Mim',
                fields: siteContentFields,
              })}
            >
              <div className="text-center py-4">
                <img src={heroImg} alt="Adriele" className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-[3px] border-[hsl(var(--rose))]" />
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {sc('sobre', 'title') || 'Sobre Mim'}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {sc('sobre', 'content') || 'Oi, eu sou a Adriele...'}
                </p>
              </div>
            </EditableBlock>
          </div>
        </section>

        {/* ═══════ PARCERIAS ═══════ */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto">
            <EditableBlock
              label="Editar parcerias"
              onClick={() => openEdit({
                type: 'site_content',
                item: siteContent['parcerias'] || { section_key: 'parcerias' },
                label: 'Parcerias & Contato',
                fields: siteContentFields,
              })}
            >
              <div className="text-center py-4">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {sc('parcerias', 'title') || 'Parcerias & Contato'}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sc('parcerias', 'content') || 'Quer falar comigo ou conhecer melhor meu trabalho?'}
                </p>
              </div>
            </EditableBlock>
          </div>
        </section>

        <div className="py-8 text-center">
          <p className="text-[10px] text-muted-foreground/40">Painel administrativo · Adriele Leite</p>
        </div>
      </div>

      {/* ═══════ EDIT SHEET ═══════ */}
      <Sheet open={!!editTarget} onOpenChange={(open) => { if (!open) setEditTarget(null); }}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="font-heading text-lg">{editTarget?.label}</SheetTitle>
            <SheetDescription className="text-xs">
              Edite os campos abaixo e clique em salvar.
            </SheetDescription>
          </SheetHeader>

          {editTarget && (
            <div className="space-y-4 pb-4">
              {editTarget.fields.map(field => {
                // Skip empty/irrelevant fields for site_content
                if (editTarget.type === 'site_content') {
                  if (field.key === 'link' && !editData[field.key]) return null;
                }

                if (field.type === 'toggle') {
                  return (
                    <label key={field.key} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 cursor-pointer">
                      <span className="text-sm font-medium text-foreground">{field.label}</span>
                      <div
                        onClick={() => setEditData({ ...editData, [field.key]: !editData[field.key] })}
                        className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 cursor-pointer ${editData[field.key] ? 'bg-green-500' : 'bg-muted-foreground/30'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-background shadow transition-transform ${editData[field.key] ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </label>
                  );
                }

                if (field.type === 'textarea') {
                  return (
                    <div key={field.key}>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">{field.label}</label>
                      <Textarea
                        value={String(editData[field.key] || '')}
                        onChange={e => setEditData({ ...editData, [field.key]: e.target.value })}
                        rows={3}
                        className="rounded-xl text-sm"
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.key}>
                    <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                      {field.type === 'url' && <LinkIcon size={10} />}
                      {field.label}
                    </label>
                    <Input
                      value={String(editData[field.key] || '')}
                      onChange={e => setEditData({ ...editData, [field.key]: e.target.value })}
                      className="rounded-xl text-sm"
                      placeholder={field.type === 'url' ? 'https://...' : ''}
                    />
                  </div>
                );
              })}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 rounded-xl h-11"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check size={16} className="mr-1" />
                      Salvar
                    </>
                  )}
                </Button>
                {editTarget && !editTarget.isNew && editTarget.type !== 'site_content' && (
                  <Button
                    variant="outline"
                    onClick={handleDelete}
                    disabled={saving}
                    className="rounded-xl h-11 text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Admin;
