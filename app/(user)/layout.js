
import "../globals.css";
import Navigation from "../../component/Navigation"

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