import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appRouter } from "./router/app.router";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
export const RecipeHubApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="bottom-right" />
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={appRouter} />;
      </QueryClientProvider>
    </>
  );
};
