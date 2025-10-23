
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css";
import Navigation from "../../component/Navigation"

export const metadata = {
  title: "Jamesallen",
  description: "Jamesallen project",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="overflow-x-hidden">
        <Navigation />
        {children}
      </body>
    </html>
  )
}