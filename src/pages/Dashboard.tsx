import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from '@/src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AppShell from '@/src/components/layout/AppShell';

// UI Components for roles
import StudentOverview from '@/src/components/dashboard/StudentOverview';
import ParentOverview from '@/src/components/dashboard/ParentOverview';
import TeacherOverview from '@/src/components/dashboard/TeacherOverview';
import AdminOverview from '@/src/components/dashboard/AdminOverview';

type Role = 'student' | 'parent' | 'teacher' | 'admin';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const activeTab = searchParams.get('tab') || 'overview';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const snap = await getDoc(doc(db, 'users', authUser.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const role: Role = userData?.userType || 'student';

  const renderActiveView = () => {
    if (!user || !userData) return null;
    switch (role) {
      case 'student': return <StudentOverview activeTab={activeTab} userData={userData} user={user} />;
      case 'parent': return <ParentOverview activeTab={activeTab} userData={userData} user={user} />;
      case 'teacher': return <TeacherOverview activeTab={activeTab} userData={userData} user={user} />;
      case 'admin': return <AdminOverview activeTab={activeTab} userData={userData} user={user} />;
      default: return <div>Role not recognized</div>;
    }
  };

  return (
    <AppShell 
      title="لوحة التحكم" 
      description="مرحباً بك في مسار التميز"
    >
      <div className="p-7 lg:p-10">
        {renderActiveView()}
      </div>
    </AppShell>
  );
}
