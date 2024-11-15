import "./config/translations/i18next.js";
import Layout from "./config/Layout";
import Router from "./config/Router";

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
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
