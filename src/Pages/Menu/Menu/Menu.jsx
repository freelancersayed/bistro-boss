
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTite/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import MenuItem from '../../Shared/MenuItem/MenuItem';



const Menu = () => {
const [menu] = useMenu();

const dessert = menu.filter(item=> item.category === 'dessert')
const soup = menu.filter(item=> item.category === 'soup')
const salad = menu.filter(item=> item.category === 'salad')
const pizza = menu.filter(item=> item.category === 'pizza')
const offered = menu.filter(item=> item.category === 'offered')

console.log(dessert);

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | menu</title>
            </Helmet>
            {/* main cover */}
            <Cover img={menuImg} title={"our menu"}></Cover>
            <SectionTitle subHeading={"---Don't Miss---"} heading={"today's offer"}></SectionTitle>
            {/* offered menu items  */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert items */}
            <MenuCategory items={dessert} title="dessert" img={dessertImg} ></MenuCategory>
            {/* pizza items */}
            <MenuCategory items={pizza} title="pizza" img={pizzaImg} ></MenuCategory>
            <MenuCategory items={salad} title="salad" img={saladImg} ></MenuCategory>
            <MenuCategory items={soup} title="soup" img={soupImg} ></MenuCategory>
  

        </div>
    );
};

export default Menu;