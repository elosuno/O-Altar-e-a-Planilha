import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Target, 
  BookOpen, 
  User as UserIcon,
  Bell,
  Settings,
  Plus,
  ArrowUp,
  ArrowDown,
  PiggyBank,
  Wallet,
  ChevronRight,
  LogOut,
  Hand,
  Lock,
  Mail,
  Phone,
  Camera,
  Save,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { User, Transaction, Goal } from './types';

// Mock Data
const MOCK_USER: User = {
  id: 1,
  name: 'Maria Silva',
  email: 'maria@email.com',
  phone: '(11) 98765-4321',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  job: 'Designer',
  goal: 'Liberdade financeira em 5 anos'
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 1, title: 'Supermercado Natural', amount: 245, type: 'expense', category: 'Alimentação', date: 'Hoje, 10:30', icon: 'shopping-cart' },
  { id: 2, title: 'Salário Principal', amount: 5200, type: 'income', category: 'Receita', date: 'Ontem, 08:00', icon: 'banknote' },
  { id: 3, title: 'Dízimo e Ofertas', amount: 520, type: 'expense', category: 'Generosidade', date: 'Ontem, 09:15', icon: 'heart' },
];

const MOCK_GOALS: Goal[] = [
  { id: 'emergency', title: 'Reserva de Emergência', category: 'emergency', current: 18500, target: 36000, deadline: 'Dezembro 2026' },
  { id: 'freedom', title: 'Jubileu Financeiro', category: 'freedom', current: 24800, target: 1200000, deadline: 'Março 2036' },
  { id: 'generosity', title: 'Fundo de Bênçãos', category: 'generosity', current: 3200, target: 12000, deadline: 'Contínuo' },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User>(MOCK_USER);

  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream md:flex-row">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-navy text-white p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center text-navy">
            <Hand size={24} />
          </div>
          <h1 className="font-bold text-lg">Altar & Planilha</h1>
        </div>

        <div className="space-y-2 flex-1">
          <NavItem active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<LayoutDashboard />} label="Início" />
          <NavItem active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} icon={<BarChart3 />} label="Relatórios" />
          <NavItem active={activeTab === 'goals'} onClick={() => setActiveTab('goals')} icon={<Target />} label="Metas" />
          <NavItem active={activeTab === 'learn'} onClick={() => setActiveTab('learn')} icon={<BookOpen />} label="Aprender" />
          <NavItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<UserIcon />} label="Perfil" />
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors w-full px-4 py-3"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeScreen user={user} />}
          {activeTab === 'reports' && <ReportsScreen />}
          {activeTab === 'goals' && <GoalsScreen />}
          {activeTab === 'learn' && <LearnScreen />}
          {activeTab === 'profile' && <ProfileScreen user={user} setUser={setUser} onLogout={() => setIsLoggedIn(false)} />}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50 rounded-t-3xl shadow-lg">
        <MobileNavItem active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<LayoutDashboard />} label="Início" />
        <MobileNavItem active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} icon={<BarChart3 />} label="Relatórios" />
        <MobileNavItem active={activeTab === 'goals'} onClick={() => setActiveTab('goals')} icon={<Target />} label="Metas" />
        <MobileNavItem active={activeTab === 'learn'} onClick={() => setActiveTab('learn')} icon={<BookOpen />} label="Aprender" />
        <MobileNavItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<UserIcon />} label="Perfil" />
      </nav>

      {/* FAB */}
      <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 gold-gradient rounded-full shadow-lg flex items-center justify-center text-navy hover:scale-110 transition-transform z-40">
        <Plus size={28} />
      </button>
    </div>
  );
}

// --- Components ---

function NavItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all",
        active ? "bg-gold/20 text-gold" : "text-white/70 hover:bg-white/5 hover:text-white"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 20 })}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function MobileNavItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all",
        active ? "text-navy" : "text-gray-400"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 22 })}
      <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );
}

function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen auth-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 gold-gradient rounded-2xl flex items-center justify-center text-navy mx-auto mb-6 shadow-2xl">
            <Hand size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Altar & Planilha</h1>
          <p className="text-gold-light opacity-80">Gestão financeira com propósito</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-2xl mb-8 flex">
          <button 
            onClick={() => setMode('login')}
            className={cn("flex-1 py-3 rounded-xl font-bold transition-all", mode === 'login' ? "bg-gold text-navy" : "text-white/60")}
          >
            Entrar
          </button>
          <button 
            onClick={() => setMode('register')}
            className={cn("flex-1 py-3 rounded-xl font-bold transition-all", mode === 'register' ? "bg-gold text-navy" : "text-white/60")}
          >
            Criar Conta
          </button>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
          onSubmit={(e) => { e.preventDefault(); onLogin(); }}
        >
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gold-light uppercase tracking-widest">Nome Completo</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
                <input type="text" className="w-full bg-white/10 border border-gold/30 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="Como você quer ser chamado?" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-gold-light uppercase tracking-widest">Email ou Celular</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
              <input type="text" className="w-full bg-white/10 border border-gold/30 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="seu@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gold-light uppercase tracking-widest">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} />
              <input type="password" className="w-full bg-white/10 border border-gold/30 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full gold-gradient py-4 rounded-xl text-navy font-bold text-lg shadow-xl hover:scale-[1.02] transition-transform">
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>
        </motion.form>
      </div>
    </div>
  );
}

function HomeScreen({ user }: { user: User }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 space-y-8"
    >
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-navy">Paz, {user.name.split(' ')[0]}!</h2>
          <p className="text-gold-dark font-medium">Como está sua alma hoje?</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white rounded-xl shadow-sm text-gold hover:scale-110 transition-transform">
            <Bell size={20} />
          </button>
          <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full border-2 border-gold shadow-md" />
        </div>
      </header>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gold/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16" />
        <div className="flex items-center gap-2 text-navy/60 font-semibold text-sm mb-4">
          <Wallet size={16} className="text-gold" />
          <span>Saldo Disponível</span>
        </div>
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-navy">R$ 4.250,00</h3>
          <p className="text-gray-400 text-xs mt-1">Atualizado há 5 minutos</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-cream p-4 rounded-2xl border-l-4 border-success">
            <ArrowUp className="text-success mb-2" size={18} />
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Entradas</span>
            <span className="text-sm font-bold text-navy">R$ 5.200</span>
          </div>
          <div className="bg-cream p-4 rounded-2xl border-l-4 border-danger">
            <ArrowDown className="text-danger mb-2" size={18} />
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Saídas</span>
            <span className="text-sm font-bold text-navy">R$ 3.150</span>
          </div>
          <div className="bg-cream p-4 rounded-2xl border-l-4 border-gold">
            <PiggyBank className="text-gold mb-2" size={18} />
            <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Metas</span>
            <span className="text-sm font-bold text-navy">3/5</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Hand size={20} className="text-gold" />
              Momento no Altar
            </h3>
          </div>
          <div className="auth-gradient p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-gold/10 rounded-full" />
            <p className="text-lg italic leading-relaxed mb-6 font-serif">
              "O dinheiro é um excelente servo, mas um mestre cruel. Se ele governa suas manhãs através da preocupação, ele governa suas noites através da insônia."
            </p>
            <div className="flex items-center gap-2 text-gold-light font-bold text-sm">
              <span>Antes de abrir a planilha, respire</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <BarChart3 size={20} className="text-gold" />
              Movimentações Recentes
            </h3>
            <button className="text-gold text-sm font-bold">Ver tudo</button>
          </div>
          <div className="space-y-3">
            {MOCK_TRANSACTIONS.map(tx => (
              <div key={tx.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer border-l-4 border-transparent hover:border-gold">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-xl",
                  tx.type === 'income' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                )}>
                  {tx.type === 'income' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-navy">{tx.title}</h4>
                  <p className="text-xs text-gray-400">{tx.date} • {tx.category}</p>
                </div>
                <div className="text-right">
                  <span className={cn("font-bold", tx.type === 'income' ? "text-success" : "text-danger")}>
                    {tx.type === 'income' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function ReportsScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 md:p-10 space-y-8"
    >
      <header>
        <h2 className="text-2xl font-bold text-navy">Relatórios</h2>
        <p className="text-gold-dark font-medium">Análise completa da sua vida financeira</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['Fluxo de Caixa', 'DRE Pessoal', 'Balanço', 'Orçamento', 'Categorias'].map((tab, i) => (
          <button 
            key={tab}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all",
              i === 0 ? "bg-navy text-gold border-2 border-gold" : "bg-white text-navy border-2 border-transparent hover:bg-gold/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportCard label="Entradas" value="R$ 8.500" change="+12%" type="success" />
        <ReportCard label="Saídas" value="R$ 6.200" change="+5%" type="danger" />
        <ReportCard label="Saldo" value="R$ 2.300" change="Superávit" type="info" />
        <ReportCard label="Projeção" value="R$ 3.100" change="Crescente" type="warning" />
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gold/10">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <BarChart3 size={20} className="text-gold" />
          Evolução do Fluxo de Caixa
        </h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gold/20 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="w-full bg-gold rounded-t-lg transition-all group-hover:bg-gold-dark"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-400">Mês {i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ReportCard({ label, value, change, type }: { label: string; value: string; change: string; type: string }) {
  const colors = {
    success: "border-success",
    danger: "border-danger",
    info: "border-info",
    warning: "border-warning"
  };
  return (
    <div className={cn("bg-white p-6 rounded-2xl shadow-sm border-l-4", colors[type as keyof typeof colors])}>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{label}</span>
      <h4 className="text-2xl font-bold text-navy mb-1">{value}</h4>
      <span className="text-xs font-bold opacity-80">{change}</span>
    </div>
  );
}

function GoalsScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 md:p-10 space-y-8"
    >
      <header>
        <h2 className="text-2xl font-bold text-navy">Suas Metas</h2>
        <p className="text-gold-dark font-medium">Transforme sonhos em conquistas</p>
      </header>

      <div className="auth-gradient p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-gold/10 rounded-full" />
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Target size={20} className="text-gold" />
            Visão de Futuro
          </h3>
        </div>
        <p className="text-lg italic font-serif text-gold-light mb-8">
          "Ser um canal de bênçãos, vivendo em liberdade financeira para servir ao Reino sem preocupações com o básico."
        </p>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4">
          <div className="w-14 h-14 gold-gradient rounded-xl flex items-center justify-center text-navy">
            <Target size={28} />
          </div>
          <div>
            <span className="text-xs font-bold text-white/60 uppercase">Meta de Independência</span>
            <h4 className="text-2xl font-bold text-gold">R$ 1.200.000</h4>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_GOALS.map(goal => (
          <div key={goal.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gold/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={cn(
                  "text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-2 inline-block",
                  goal.category === 'emergency' ? "bg-danger/10 text-danger" :
                  goal.category === 'freedom' ? "bg-info/10 text-info" : "bg-success/10 text-success"
                )}>
                  {goal.category}
                </span>
                <h4 className="font-bold text-navy text-lg">{goal.title}</h4>
                <p className="text-xs text-gray-400">Meta: {goal.deadline}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-navy">R$ {(goal.current / 1000).toFixed(1)}k</div>
                <div className="text-xs text-gray-400">de R$ {(goal.target / 1000).toFixed(1)}k</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                <span>{Math.round((goal.current / goal.target) * 100)}% concluído</span>
                <span>R$ {(goal.target - goal.current).toLocaleString()} restantes</span>
              </div>
              <div className="progress-bar">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                  className={cn(
                    "progress-fill",
                    goal.category === 'emergency' ? "bg-danger" :
                    goal.category === 'freedom' ? "bg-info" : "bg-success"
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LearnScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 md:p-10 space-y-8"
    >
      <header>
        <h2 className="text-2xl font-bold text-navy">Aprendizado</h2>
        <p className="text-gold-dark font-medium">Cresça em sabedoria e prosperidade</p>
      </header>

      <div className="auth-gradient p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-gold/10 rounded-full" />
        <span className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2 block">Versículo do Dia</span>
        <p className="text-xl italic font-serif leading-relaxed mb-4">
          "Honra o Senhor com os teus bens e com as primícias de toda a tua renda; assim se encherão fartamente os teus celeiros..."
        </p>
        <span className="font-bold text-gold-light">Provérbios 3:9-10</span>
      </div>

      <section className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <BookOpen size={20} className="text-gold" />
          Estudo do Livro
        </h3>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gold/5">
          <div className="auth-gradient p-8 flex gap-6 items-center">
            <div className="w-24 h-32 gold-gradient rounded-lg shadow-2xl flex flex-col items-center justify-center p-4 text-center">
              <Hand size={32} className="text-navy mb-2" />
              <span className="text-[8px] font-black text-navy leading-tight">O ALTAR E A PLANILHA</span>
            </div>
            <div className="text-white">
              <h4 className="text-xl font-bold mb-1">O Altar e a Planilha</h4>
              <p className="text-sm opacity-70 mb-4">Jackson Viana</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-3/4" />
                </div>
                <span className="text-xs font-bold text-gold">75%</span>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <LessonItem number="I" title="O Solo" subtitle="Fundamentos" completed />
            <LessonItem number="II" title="A Semente" subtitle="Disciplina" completed />
            <LessonItem number="III" title="O Cultivo" subtitle="Resiliência" active />
            <LessonItem number="IV" title="A Colheita" subtitle="Legado" locked />
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function LessonItem({ number, title, subtitle, completed, active, locked }: { number: string; title: string; subtitle: string; completed?: boolean; active?: boolean; locked?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer",
      active ? "bg-cream border border-gold/20" : "hover:bg-gray-50"
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
        completed ? "bg-success text-white" : active ? "bg-gold text-navy" : "bg-gray-100 text-gray-400"
      )}>
        {completed ? <ShieldCheck size={18} /> : number}
      </div>
      <div className="flex-1">
        <h5 className={cn("font-bold text-sm", locked ? "text-gray-300" : "text-navy")}>{title}</h5>
        <p className="text-[10px] text-gray-400 uppercase font-bold">{subtitle}</p>
      </div>
      {locked ? <Lock size={16} className="text-gray-200" /> : <ChevronRight size={16} className="text-gray-300" />}
    </div>
  );
}

function ProfileScreen({ user, setUser, onLogout }: { user: User; setUser: (u: User) => void; onLogout: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 space-y-8"
    >
      <header className="text-center">
        <div className="relative inline-block mb-6">
          <img src={user.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-gold shadow-xl" />
          <button className="absolute bottom-1 right-1 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy shadow-lg border-4 border-white">
            <Camera size={18} />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-navy">{user.name}</h2>
        <p className="text-gold-dark font-medium">{user.email}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gold/5 space-y-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <UserIcon size={20} className="text-gold" />
            Informações Pessoais
          </h3>
          <div className="space-y-4">
            <ProfileField label="Nome Completo" value={user.name} icon={<UserIcon />} />
            <ProfileField label="Celular" value={user.phone} icon={<Phone />} />
            <ProfileField label="Email" value={user.email} icon={<Mail />} />
            <ProfileField label="Profissão" value={user.job || 'Não informada'} icon={<Settings />} />
          </div>
          <button className="w-full gold-gradient py-4 rounded-xl text-navy font-bold flex items-center justify-center gap-2">
            <Save size={20} />
            Salvar Alterações
          </button>
        </div>

        <div className="space-y-4">
          <ProfileMenuItem icon={<Lock />} title="Alterar Senha" subtitle="Atualize sua segurança" />
          <ProfileMenuItem icon={<Bell />} title="Notificações" subtitle="Configure seus alertas" />
          <ProfileMenuItem icon={<ShieldCheck />} title="Privacidade" subtitle="Gerencie seus dados" />
          <ProfileMenuItem icon={<HelpCircle />} title="Ajuda e Suporte" subtitle="Tire suas dúvidas" />
          <button 
            onClick={onLogout}
            className="w-full bg-danger/10 text-danger p-6 rounded-3xl flex items-center gap-4 hover:bg-danger/20 transition-all font-bold"
          >
            <div className="w-12 h-12 bg-danger/20 rounded-xl flex items-center justify-center">
              <LogOut size={24} />
            </div>
            <div className="text-left">
              <h4 className="text-lg">Sair da Conta</h4>
              <p className="text-xs opacity-70">Desconectar do aplicativo</p>
            </div>
            <ChevronRight size={20} className="ml-auto" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileField({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold">
          {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </div>
        <input 
          type="text" 
          readOnly 
          value={value} 
          className="w-full bg-cream border-2 border-transparent rounded-xl py-4 pl-12 pr-4 text-navy font-medium focus:outline-none focus:border-gold transition-all" 
        />
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button className="w-full bg-white p-6 rounded-3xl shadow-sm border border-gold/5 flex items-center gap-4 hover:bg-cream transition-all">
      <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-gold">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <div className="text-left">
        <h4 className="text-lg font-bold text-navy">{title}</h4>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <ChevronRight size={20} className="ml-auto text-gray-300" />
    </button>
  );
}

function openTransactionModal() {
  alert('Funcionalidade de lançamento em desenvolvimento!');
}

function showNotifications() {
  alert('Você não tem novas notificações.');
}

function editVision() {
  alert('Edição de visão em desenvolvimento!');
}

function exportReports() {
  alert('Exportação de relatórios em desenvolvimento!');
}

function switchReport(id: string) {
  console.log('Switching to report:', id);
}
