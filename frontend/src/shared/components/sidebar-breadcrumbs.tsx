import React, { createContext, useContext, useEffect } from "react";

type Context = {
  breadcrumbs: React.ReactNode;
  setBreadcrumbs: React.Dispatch<React.SetStateAction<React.ReactNode>>;
};

const SidebarBreadcrumbsContext = createContext<Context | null>(null);

export const SidebarBreadcrumbsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [breadcrumbs, setBreadcrumbs] =
    React.useState<React.ReactNode>(undefined);

  return (
    <SidebarBreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </SidebarBreadcrumbsContext.Provider>
  );
};

export const SidebarBreadcrumbs = () => {
  const context = useContext(SidebarBreadcrumbsContext);
  if (context == null) {
    throw new Error(
      "useSidebarBreadcrumbs should be used within <SidebarBreadcrumbsProvider />",
    );
  }

  return context.breadcrumbs;
};

export const SetSidebarBreadcrumbs = ({
  children,
}: React.PropsWithChildren) => {
  const context = useContext(SidebarBreadcrumbsContext);
  if (context == null) {
    throw new Error(
      "SetSidebarBreadcrumbs should be used within <SidebarBreadcrumbsProvider />",
    );
  }

  let prev = context.breadcrumbs;

  useEffect(() => {
    context.setBreadcrumbs((preBreadcrumbs) => {
      prev = preBreadcrumbs;
      return children;
    });

    return () => {
      context.setBreadcrumbs(prev);
    };
  }, [context, children]);

  return undefined;
};
