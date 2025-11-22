"use client";

import TinaProvider from "tinacms";
import { LocalClient, TinaAdmin, type TinaCMSProviderDefaultProps } from "tinacms";
import { useMemo } from "react";
import tinaConfig from "../../../../tina/config";

export default function AdminPage() {
  const cmsProps: TinaCMSProviderDefaultProps = useMemo(() => {
    const apiURL =
      process.env.NEXT_PUBLIC_TINA_CONTENT_API_URL ||
      (tinaConfig.local ? "http://localhost:4001/graphql" : undefined);

    const client = new LocalClient({
      customContentApiUrl: apiURL,
      schema: tinaConfig.schema,
    });

    return {
      branch: tinaConfig.branch,
      clientId: tinaConfig.clientId,
      token: tinaConfig.token,
      tinaGraphQLVersion: "1.5",
      client,
      schema: tinaConfig.schema,
      mediaStore: tinaConfig.media?.tina,
      formifyCallback: tinaConfig.formifyCallback,
      documentCreatorCallback: tinaConfig.documentCreatorCallback,
    };
  }, []);

  return (
    <TinaProvider {...cmsProps}>
      <TinaAdmin config={tinaConfig} />
    </TinaProvider>
  );
}

export const dynamic = "force-dynamic";
