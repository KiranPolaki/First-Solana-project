import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import {
  HomeView,
  ToolView,
  FeatureView,
  OfferView,
  FaqView,
  CreateView,
  TokenMetadata,
  ContactView,
  AirDropView,
  DonateView,
} from "../views";

const Home: NextPage = (props) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openTokenMetaData, setOpenTokenMetaData] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAirDrop, setOpenAirDrop] = useState(false);
  const [openSendTransaction, setOpenSendTransaction] = useState(false);
  return (
    <>
      <Head>
        <title>Solana Token Generator</title>
        <meta
          name="Solana Token Generator"
          content="Build and create solana token"
        />
      </Head>
      <HomeView setOpenCreateModal={setOpenCreateModal} />
      {/* <ToolView
        setOpenAirDrop={setOpenAirDrop}
        setOpenContact={setOpenContact}
        setOpenCreateModal={setOpenCreateModal}
        setOpenSendTransaction={setOpenSendTransaction}
        setOpenTokenMetaData={setOpenTokenMetaData}
      />
      <FeatureView
        setOpenAirDrop={setOpenAirDrop}
        setOpenContact={setOpenContact}
        setOpenCreateModal={setOpenCreateModal}
        setOpenSendTransaction={setOpenSendTransaction}
        setOpenTokenMetaData={setOpenTokenMetaData}
      />
      <OfferView />
      <FaqView />
      {openCreateModal && (
        <div className="new_loader relative h-full bg-slate-900">
          <CreateView setOpenCreateModal={setOpenCreateModal} />
        </div>
      )}
      {openTokenMetaData && (
        <div className="new_loader relative h-full bg-slate-900">
          <TokenMetadata setOpenTokenMetaData={setOpenTokenMetaData} />
        </div>
      )}
      {openContact && (
        <div className="new_loader relative h-full bg-slate-900">
          <ContactView setOpenContact={setOpenTokenMetaData} />
        </div>
      )}
      {openAirDrop && (
        <div className="new_loader relative h-full bg-slate-900">
          <AirDropView setOpenAirDrop={setOpenAirDrop} />
        </div>
      )}
      {openSendTransaction && (
        <div className="new_loader relative h-full bg-slate-900">
          <DonateView setOpenSendTransaction={setOpenSendTransaction} />
        </div>
      )} */}
    </>
  );
};

export default Home;
