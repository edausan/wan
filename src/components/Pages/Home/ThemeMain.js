import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectThemes } from "../../../redux/slices/postsSlice";
import Theme from "./Theme";

const ThemeMain = () => {
	const themes = useSelector(selectThemes);

	const thisMonth = moment().format("MMMM");
	const thisYear = moment().format("YYYY");

	const currentTheme = () => {
		const filtered = themes.filter(
			(theme) => theme?.tags[1] === thisMonth && theme?.tags[0] === thisYear
		)[0];

		return filtered;
	};

	return (
		<div className="flex flex-col gap-4 ThemeWrapper w-full">
			<Theme key={currentTheme()?.id} theme={currentTheme()} />
			<div className="flex flex-row gap-2 w-full overflow-x-auto pb-3 mt-4 items-stretch justify-start max-w-[680px] mx-auto">
				{themes
					.filter((theme, idx) => theme?.id !== currentTheme()?.id)
					.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
					?.map((theme) => {
						return <Theme key={theme?.id} theme={theme} isRow />;
					})}
			</div>
		</div>
	);
};

export default ThemeMain;
