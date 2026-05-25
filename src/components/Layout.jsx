import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="p-5">{children}</main>
            <Footer />
        </>
    )
}