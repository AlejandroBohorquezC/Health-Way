import Image from 'next/image';
import { IRecipeList } from './RecipeList.interface';
import styled from '@emotion/styled';

const RecipeStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 18px;
`;

const RecipeList = ({hits}: IRecipeList) => {
  return (
    <div>
        {hits?.map(({recipe}) => (
            <RecipeStyled key={recipe.image}>
                <p>{recipe.label}</p>
                <Image src={recipe.image} width={150} height={150} alt='recipe image' />
            </RecipeStyled>
        ))}
    </div>
  )
}

export default RecipeList