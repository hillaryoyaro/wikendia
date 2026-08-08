import { Navbar } from "@/components/shared/header/navbar/navbar";
//import { Footer } from "@/components/shared/footer/footer";

export default function MarketingLayout({
children
}:{
children:React.ReactNode
}){

return (
<>
<Navbar />

<main>
{children}
</main>


</>
)

}