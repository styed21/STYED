import { Shell } from "./components/Shell";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Programs } from "./pages/Programs";
import { Involved } from "./pages/Involved";
import { Donate } from "./pages/Donate";
import { Contact } from "./pages/Contact";
import { Mentorship } from "./pages/Mentorship";
import type { Page } from "./data/content";
import { ThemeProvider } from "next-themes";

export function App({ page }: { page: Page }) {
  const content = {
    home: <Home />,
    about: <About />,
    programs: <Programs />,
    involved: <Involved />,
    donate: <Donate />,
    contact: <Contact />,
    mentorship: <Mentorship />,
  };
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
    >
      <Shell page={page}>{content[page]}</Shell>
    </ThemeProvider>
  );
}
