import "@Config/i18next.js";
import Layout from "@Config/layout/Layout";
import Router from "@Config/Router";
import ContextCache from "@Config/contextCache.tsx";

/**
 * El componente raíz de la aplicación. Este componente es el punto de
 * entrada a la aplicación y se encarga de configurar el enrutador y el
 * contexto de la aplicación.
 * @returns {JSX.Element}
 * - un elemento JSX que contiene el enrutador y el contexto.
 */
function App() {
  return (
    <ContextCache>
      <Router Layout={Layout} />
    </ContextCache>
  );
}

export default App;
