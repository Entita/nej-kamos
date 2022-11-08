import axios from "axios";
import { setCookie } from "cookies-next";
import { refreshAccount } from "../redux/account";
import { refreshBasket } from "../redux/basket";
import { refreshCategories } from "../redux/categories";
import { refreshProducts } from "../redux/products";
import { wrapper } from "../redux/store";
import { refreshSubcategories } from "../redux/subcategories";
import { refreshSupportChat } from "../redux/support_chat";
import agent from "../utils/agent";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    axios.defaults.headers.common['precookie'] = JSON.stringify(
      context.req.cookies,
    );
    const basket = await agent.Basket.get();
    const account = await agent.Account.get();
    const categories = await agent.Category.get();
    const subCategories = await agent.Subcategory.get();
    const products = await agent.Product.get();
    const supportChat = await agent.Support.get();
    delete axios.defaults.headers.common['precookie'];

    if (!basket.failed) {
      store.dispatch(refreshBasket(basket.data));
      store.dispatch(refreshCategories(categories));
      store.dispatch(refreshSubcategories(subCategories));
      store.dispatch(refreshProducts(products));
      store.dispatch(refreshSupportChat(supportChat));
      if (basket)
        setCookie('basketId', basket.data._id, {
          req: context.req,
          res: context.res,
        });
      if (account) {
        store.dispatch(refreshAccount(account.data));
        setCookie('accountId', account.data._id, {
          req: context.req,
          res: context.res,
        });
      }
    }

    return {
      props: {
        basket,
        account,
        categories,
        subCategories,
        products,
        supportChat,
      },
    };
  },
);