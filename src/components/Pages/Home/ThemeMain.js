import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectThemes } from '../../../redux/slices/postsSlice';
import Theme from './Theme';

const ThemeMain = () => {
  const themes = useSelector(selectThemes);

  useEffect(() => {
    console.log({ themes });
  }, [themes]);

  return (
    <div className="flex flex-col gap-4 ThemeWrapper w-full">
      <Theme
        key={themes[themes.length - 1]?.id}
        theme={themes[themes.length - 1]}
      />
      <div className="flex flex-row gap-2 w-full phone:max-w-[100%] phone:overflow-x-auto pb-3 mt-4 items-stretch desktop:justify-start laptop:justify-start phone:justify-start desktop:flex-wrap desktop:max-w-[680px] laptop:max-w-[680px] mx-auto ">
        {themes
          .filter((theme, idx) => idx !== themes.length - 1)
          ?.map((theme) => {
            return <Theme key={theme?.id} theme={theme} isRow />;
          })}
      </div>
    </div>
  );
};

export default ThemeMain;
