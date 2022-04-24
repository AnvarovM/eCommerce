import React from "react";
import { Toaster } from "react-hot-toast";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import "../styles/globals.css";

const progress = new ProgressBar({
  size: 3,
  color: "#f02d34",
  className: "z-50 bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />;
      </Layout>
    </StateContext>
  );
}

export default MyApp;
