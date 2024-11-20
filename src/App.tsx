import "@Config/i18next.js";
import Layout from "@Config/layout/Layout";
import Router from "@Config/Router";
import ContextCache from "@Config/contextCache.tsx";

/**
 * El componente de nivel superior para la aplicación.
 *
 * Este componente envuelve el componente Router con el proveedor de contexto ContextCache
 * que proporciona los datos del podcast al resto de la
 * aplicación.
 *
 * @returns {JSX.Element} El componente de nivel superior para la aplicación.
 */
function App() {
  return (
    <ContextCache>
      <Router Layout={Layout} />
    </ContextCache>
  );
}

export default App;
