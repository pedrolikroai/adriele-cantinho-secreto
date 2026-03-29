import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ContentItem = Record<string, unknown>;

const TABLES = [
  { key: 'achadinhos', label: 'Achadinhos', fields: ['title', 'description', 'image_url', 'link', 'price', 'active', 'sort_order'] },
  { key: 'promocoes', label: 'Promoções', fields: ['title', 'description', 'image_url', 'link', 'price', 'original_price', 'active', 'sort_order'] },
  { key: 'favoritos', label: 'Favoritos', fields: ['title', 'description', 'image_url', 'link', 'category', 'is_featured', 'active', 'sort_order'] },
  { key: 'avisos', label: 'Avisos', fields: ['title', 'content', 'active'] },
  { key: 'site_content', label: 'Textos do Site', fields: ['section_key', 'title', 'subtitle', 'content', 'image_url', 'link'] },
];

const FIELD_LABELS: Record<string, string> = {
  title: 'Título', description: 'Descrição', image_url: 'URL da Imagem', link: 'Link',
  price: 'Preço', original_price: 'Preço Original', active: 'Ativo', sort_order: 'Ordem',
  category: 'Categoria', is_featured: 'Destaque', content: 'Conteúdo', section_key: 'Chave da Seção',
  subtitle: 'Subtítulo',
};

const Admin = () => {
  const { isAuthenticated, isLoading, logout, adminFetch } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('achadinhos');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) loadItems();
  }, [activeTab, isAuthenticated]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await adminFetch(activeTab);
      setItems(data || []);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Sessão expirada') {
        navigate('/admin/login');
      }
      toast({ title: 'Erro ao carregar dados', variant: 'destructive' });
    }
    setLoading(false);
  };

  const currentTable = TABLES.find(t => t.key === activeTab)!;

  const handleNew = () => {
    const empty: ContentItem = {};
    currentTable.fields.forEach(f => {
      if (f === 'active') empty[f] = true;
      else if (f === 'is_featured') empty[f] = false;
      else if (f === 'sort_order') empty[f] = 0;
      else empty[f] = '';
    });
    setEditItem(empty);
    setIsNew(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditItem({ ...item });
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editItem) return;
    try {
      if (isNew) {
        await adminFetch(activeTab, 'POST', undefined, editItem);
        toast({ title: 'Item criado com sucesso' });
      } else {
        await adminFetch(activeTab, 'PUT', editItem.id as string, editItem);
        toast({ title: 'Item atualizado com sucesso' });
      }
      setEditItem(null);
      loadItems();
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover?')) return;
    try {
      await adminFetch(activeTab, 'DELETE', id);
      toast({ title: 'Item removido' });
      loadItems();
    } catch {
      toast({ title: 'Erro ao remover', variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="font-heading text-xl text-foreground">Painel Adriele</h1>
        <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/admin/login'); }}>
          <LogOut className="w-4 h-4 mr-1" /> Sair
        </Button>
      </header>

      <div className="p-4 max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setEditItem(null); }}>
          <TabsList className="flex flex-wrap mb-4">
            {TABLES.map(t => (
              <TabsTrigger key={t.key} value={t.key} className="text-xs">{t.label}</TabsTrigger>
            ))}
          </TabsList>

          {TABLES.map(t => (
            <TabsContent key={t.key} value={t.key}>
              {/* Edit/New Form */}
              {editItem && (
                <div className="border border-border rounded-lg p-4 mb-4 bg-card space-y-3">
                  <h3 className="font-medium text-foreground">{isNew ? 'Novo Item' : 'Editar Item'}</h3>
                  {currentTable.fields.map(field => {
                    if (field === 'section_key' && !isNew) {
                      return (
                        <div key={field}>
                          <label className="text-xs text-muted-foreground">{FIELD_LABELS[field]}</label>
                          <Input value={String(editItem[field] || '')} disabled />
                        </div>
                      );
                    }
                    if (field === 'active' || field === 'is_featured') {
                      return (
                        <label key={field} className="flex items-center gap-2 text-sm text-foreground">
                          <input
                            type="checkbox"
                            checked={!!editItem[field]}
                            onChange={e => setEditItem({ ...editItem, [field]: e.target.checked })}
                            className="rounded"
                          />
                          {FIELD_LABELS[field]}
                        </label>
                      );
                    }
                    if (field === 'content' || field === 'description') {
                      return (
                        <div key={field}>
                          <label className="text-xs text-muted-foreground">{FIELD_LABELS[field]}</label>
                          <Textarea
                            value={String(editItem[field] || '')}
                            onChange={e => setEditItem({ ...editItem, [field]: e.target.value })}
                            rows={3}
                          />
                        </div>
                      );
                    }
                    if (field === 'sort_order') {
                      return (
                        <div key={field}>
                          <label className="text-xs text-muted-foreground">{FIELD_LABELS[field]}</label>
                          <Input
                            type="number"
                            value={String(editItem[field] || 0)}
                            onChange={e => setEditItem({ ...editItem, [field]: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={field}>
                        <label className="text-xs text-muted-foreground">{FIELD_LABELS[field]}</label>
                        <Input
                          value={String(editItem[field] || '')}
                          onChange={e => setEditItem({ ...editItem, [field]: e.target.value })}
                        />
                      </div>
                    );
                  })}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={handleSave}><Save className="w-3 h-3 mr-1" />Salvar</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditItem(null)}><X className="w-3 h-3 mr-1" />Cancelar</Button>
                  </div>
                </div>
              )}

              {/* Add button */}
              {!editItem && t.key !== 'site_content' && (
                <Button size="sm" className="mb-4" onClick={handleNew}>
                  <Plus className="w-3 h-3 mr-1" /> Adicionar
                </Button>
              )}

              {/* Table */}
              {loading ? (
                <p className="text-muted-foreground text-sm">Carregando...</p>
              ) : items.length === 0 ? (
                <p className="text-muted-foreground text-sm">Nenhum item encontrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        {t.key === 'site_content' && <TableHead>Seção</TableHead>}
                        {t.fields.includes('active') && <TableHead>Status</TableHead>}
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id as string}>
                          <TableCell className="font-medium">{String(item.title || item.section_key || '-')}</TableCell>
                          {t.key === 'site_content' && <TableCell className="text-xs text-muted-foreground">{String(item.section_key)}</TableCell>}
                          {t.fields.includes('active') && (
                            <TableCell>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {item.active ? 'Ativo' : 'Inativo'}
                              </span>
                            </TableCell>
                          )}
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                                <Pencil className="w-3 h-3" />
                              </Button>
                              {t.key !== 'site_content' && (
                                <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id as string)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
