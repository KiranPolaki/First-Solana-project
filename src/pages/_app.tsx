import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "contexts/ContextProvider";
import { AppBar } from "components/AppBar";
import { Footer } from "components/Footer";
import Notification from "components/Notification";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="bg-[#7f1d1d]">
      <Head>
        <title>Solana Token creator</title>
      </Head>
      <ContextProvider>
        <Notification />
        <AppBar />
        <Component {...pageProps} />
        <Footer />
      </ContextProvider>
      <script src="assets/libs/preline/parline.js"></script>
      <script src="assets/libs/swiper/swiper-bundle.min.js.js"></script>
      <script src="assets/libs/gumshoejs/gumshoe.polyfils.min.js"></script>
      <script src="assets/libs/lucide/lucid.min.js"></script>
      <script src="assets/libs/aos/aos.js"></script>
      <script src="assets/js/swiper.js"></script>
      <script src="assets/js/theme.js"></script>
    </div>
  );
};

export default App;
