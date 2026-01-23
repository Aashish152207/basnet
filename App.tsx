
import React, { useState, useEffect, useCallback } from 'react';
import { User, Role, AppState, DiamondPack, NewsItem, Order } from './types';
import { INITIAL_DIAMONDS, INITIAL_NEWS, DEFAULT_QR } from './constants';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>({
    diamonds: INITIAL_DIAMONDS,
    news: INITIAL_NEWS,
    orders: [],
    qrCodeUrl: DEFAULT_QR,
  });

  // Persist state to local storage to simulate a DB
  useEffect(() => {
    const saved = localStorage.getItem('nexus_state');
    if (saved) {
      try {
        setAppState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
  }, []);

  const saveState = useCallback((newState: AppState) => {
    setAppState(newState);
    localStorage.setItem('nexus_state', JSON.stringify(newState));
  }, []);

  const handleLogin = (username: string, role: Role) => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      role
    };
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const updateDiamonds = (newList: DiamondPack[]) => {
    saveState({ ...appState, diamonds: newList });
  };

  const updateNews = (newList: NewsItem[]) => {
    saveState({ ...appState, news: newList });
  };

  const updateQrCode = (url: string) => {
    saveState({ ...appState, qrCodeUrl: url });
  };

  const createOrder = (diamondPackId: string, screenshotUrl: string) => {
    if (!currentUser) return;
    const pack = appState.diamonds.find(d => d.id === diamondPackId);
    if (!pack) return;

    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      customerId: currentUser.id,
      username: currentUser.username,
      diamondPackId,
      amount: pack.amount + pack.bonus,
      price: pack.price,
      status: 'pending',
      screenshotUrl,
      timestamp: Date.now()
    };

    saveState({ ...appState, orders: [newOrder, ...appState.orders] });
  };

  const updateOrderStatus = (orderId: string, status: 'completed' | 'rejected') => {
    const updatedOrders = appState.orders.map(o => 
      o.id === orderId ? { ...o, status } : o
    );
    saveState({ ...appState, orders: updatedOrders });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
      </div>

      <Navbar user={currentUser} onLogout={handleLogout} />

      <main className="flex-grow pt-20">
        {!currentUser ? (
          <Landing 
            news={appState.news} 
            onLoginRequest={() => {
              const el = document.getElementById('login-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ) : currentUser.role === 'customer' ? (
          <CustomerDashboard 
            user={currentUser}
            diamonds={appState.diamonds}
            orders={appState.orders.filter(o => o.customerId === currentUser.id)}
            qrCodeUrl={appState.qrCodeUrl}
            onBuy={createOrder}
          />
        ) : (
          <AdminDashboard 
            diamonds={appState.diamonds}
            news={appState.news}
            orders={appState.orders}
            qrCodeUrl={appState.qrCodeUrl}
            onUpdateDiamonds={updateDiamonds}
            onUpdateNews={updateNews}
            onUpdateQr={updateQrCode}
            onUpdateOrderStatus={updateOrderStatus}
          />
        )}

        {!currentUser && (
          <div id="login-section" className="py-20 flex justify-center items-center px-4">
            <Login onLogin={handleLogin} />
          </div>
        )}
      </main>

      <footer className="py-10 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p className="font-gaming uppercase tracking-widest">&copy; 2024 NEXUS GAMING PORTAL. ALL RIGHTS RESERVED.</p>
        <p className="mt-2">Premium Experience. Absolute Security.</p>
      </footer>
    </div>
  );
};

export default App;
