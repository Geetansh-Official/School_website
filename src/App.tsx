import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from '@/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="school-theme">
      <AppRoutes />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;