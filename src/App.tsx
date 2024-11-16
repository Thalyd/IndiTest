import "@Config/i18next.js";
import Layout from "@Config/layout/Layout";
import Router from "@Config/Router";
import ContextCache from "@Config/contextCache.tsx";

/**
 * El punto de entrada principal de la aplicación.
 *
 * Este componente representa el <Layout /> principal y dentro de él el <Router /> principal
 * que es el punto de entrada al sistema de enrutamiento de la aplicación.
 *
 * @returns {React.ReactElement} El elemento JSX.
 */
function App() {
  return (
    <ContextCache>
      <Layout>
        <Router />
      </Layout>
    </ContextCache>
  );
}

export default App;
