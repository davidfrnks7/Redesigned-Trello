import { AppPropsWithLayout } from "@/types/page";
import React, { ReactNode } from "react";

function TrelloClone({ Component, pageProps }: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default TrelloClone;
