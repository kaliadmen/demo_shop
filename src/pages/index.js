import {useEffect, useState} from "react";
import Product from "@/components/Product";
import {initMongoose} from "@/lib/mongoose";
import {findAllProducts} from "@/pages/api/products";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

export default function Home({products}) {
  const [phrase, setPhrase] = useState('');

  const categories = [...new Set(products.map(product => (product.category)))];

  if(phrase) {
    products = products.filter(product => product.name.toLowerCase().includes(phrase.toLowerCase()));
  }

  return (
      <Layout>
          <input type="text" value={phrase} onChange={e => setPhrase(e.target.value)} className="bg-gray-100 w-full py-2 rounded-xl px-4" placeholder="Search for products..."/>
          <div>
            {categories.map(category => (
                <div key={category}>
                  {products.find(product => product.category === category) && (
                      <div>
                        <h2 className="text-2xl py-5 capitalize font-semibold">{category}</h2>
                        <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                          {products.filter(product => product.category === category).map(productInfo => (
                              <div key={productInfo._id} className="px-5 snap-start">
                                <Product {...productInfo}/>
                              </div>
                          ))}
                        </div>
                      </div>
                  )}
                </div>
            ))}
        </div>
      </Layout>
  )
}


export async function getServerSideProps() {
  await initMongoose();

  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  };
}