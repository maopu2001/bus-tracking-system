import QueryClientProviderComponent from "../components/QueryClientProviderComponent";
import "./globals.css";

export const metadata = {
  title: "Track My Bus - RMSTU",
  description: "Created By Team Zero Or One",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProviderComponent>{children}</QueryClientProviderComponent>
      </body>
    </html>
  );
}
