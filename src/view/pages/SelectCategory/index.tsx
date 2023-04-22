import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";
import {CategoryItem} from "view/module/categoryItem";

const categoryList = [
    {
        id: 1,
        name: 'НОВИЧКИ',
        description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. ',
        price: 2300
    },
    {
        id: 2,
        name: 'ЛЮБИТЕЛИ',
        description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. ',
        price: 2300
    },
    {
        id: 3,
        name: 'ПРОФЕССИОНАЛЫ',
        description: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. ',
        price: 2300
    },
]
export const SelectCategory = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    if (!id) return null
    return (
        <div className={css(s.SelectCategory)}>
            <div className={css(s.container)}>
                <div className={css(s.main)} >
                    <Button text={`←    Назад`} click={()=>navigate(`/tournament/${id}`)}/>
                    <div className={css(s.titlePage)}>Выбор категории</div>
                    <div className={css(s.list)}>
                        {categoryList.map(category => {
                            return <CategoryItem key={category.id} category={category}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
