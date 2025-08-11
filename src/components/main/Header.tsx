import ThemeToggle from '../header/ThemeToggle';
import LanguageSwitcher from '../header/LanguageSwitcher';


export default function header({ locale }: { locale: string }) {
  return (
    <header className="p-4 bg-slate-200 dark:bg-neutral-900	 light:bg-white">
      <nav className="mx-auto max-w-screen-xl flex justify-between items-center">
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
      </nav>
    </header>
  );
}
