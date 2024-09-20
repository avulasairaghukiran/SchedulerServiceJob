import { useTheme } from "styled-components";
import { FC, MouseEventHandler } from "react";
import { Icon, IconButton, Toggle } from "../../../../components";
import { useCalendar } from "../../../../context/CalendarProvider";

import { useLanguage } from "../../../../context/LocaleProvider";
import {
  NavigationWrapper,
  Wrapper,
  NavBtn,
  Today,
  Zoom,
  Filters,
  OptionsContainer
} from "./styles";
import { TopbarProps } from "./types";
import { ZoomLevel } from "../../../../types/global";

const Topbar: FC<TopbarProps> = ({ width, showThemeToggle, toggleTheme }) => {
  const { topbar } = useLanguage();
  const {
    data,
    config,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    // zoomIn,
    zoom,
    // zoomOut,
    changeZoom,
    // isNextZoom,
    // isPrevZoom,
    handleFilterData,
    onClearFilterData
  } = useCalendar();
  const { colors } = useTheme();
  const { filterButtonState = -1 } = config;
  // zoom level is set
// const [zoomLevel, setZoomLevel] = useState(0);
  const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onClearFilterData?.();
  };
  const buttonStyle = (bgColor: string) => ({
    padding: '5px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: bgColor,
    transition: 'background-color 0.3s ease',
  });
  // handle the zoom
  const handleZoom = (zoomLevel: ZoomLevel) => {
    changeZoom(zoomLevel);
    // setZoomLevel(zoomLevel);
  };
  return (
    <Wrapper width={width}>
      <Filters>
        {filterButtonState >= 0 && (
          <IconButton
            variant={filterButtonState ? "filled" : "outlined"}
            iconName="filter"
            width="16"
            height="16"
            onClick={handleFilterData}>
            {topbar.filters}
            {!!filterButtonState && (
              <span onClick={handleClearFilters}>
                <Icon iconName="close" height="16" width="16" fill={colors.textSecondary} />
              </span>
            )}
          </IconButton>
        )}
      </Filters>
      <NavigationWrapper>
        <NavBtn disabled={!data?.length} onClick={handleGoPrev}>
          <Icon iconName="arrowLeft" height="15" fill={colors.textPrimary} />
          {topbar.prev}
        </NavBtn>
        <Today onClick={handleGoToday}>{topbar.today}</Today>
        <NavBtn disabled={!data?.length} onClick={handleGoNext}>
          {topbar.next}
          <Icon iconName="arrowRight" height="15" fill={colors.textPrimary} />
        </NavBtn>
      </NavigationWrapper>
     
      <OptionsContainer>
        {showThemeToggle && <Toggle toggleTheme={toggleTheme} />}
        <Zoom>
          {/* {topbar.view} */}
          {/* <IconButton
            isDisabled={!isPrevZoom}
            onClick={zoomOut}
            isFullRounded
            iconName="subtract"
            width="14"
          />
          
          <IconButton
            isDisabled={!isNextZoom}
            onClick={zoomIn}
            isFullRounded
            iconName="add"
            width="14"
          /> */}  <div className="border rounded-md flex gap-2 p-1 justify-between ">
          <div>Status :</div>
 <div className="colorpallete flex gap-1 mr-4">
                <div
                    className="new w-4 h-4 rounded cursor-pointer"
                    style={{ backgroundColor: 'rgb(21, 180, 191)' }}
                    title="New"
                ></div>
                <div
                    className="workinprogress  w-4 h-4 rounded cursor-pointer"
                    style={{ backgroundColor: 'rgb(21, 132, 191)' }}
                    title="Work in Progress"
                ></div>
                <div
                    className="onhold w-4 h-4 rounded cursor-pointer"
                    style={{ backgroundColor: 'rgb(253, 126, 20)' }}
                    title="On Hold"
                ></div>
                <div
                    className="completed w-4 h-4 rounded cursor-pointer"
                    style={{ backgroundColor: 'rgb(40, 167, 69)' }}
                    title="Completed"
                ></div>
                <div
                    className="cancelled w-4 h-4 rounded cursor-pointer"
                    style={{ backgroundColor: 'rgb(220, 53, 53)' }}
                    title="Cancelled"
                ></div>
            </div>
            </div>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
              style={buttonStyle(zoom === 2 ? '#3498db' : '#00375c')}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              onClick={() => handleZoom(2)}
            >
              Day
            </button>
            <button
              style={buttonStyle(zoom === 1 ? '#3498db' : '#00375c')}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              onClick={() => handleZoom(1)}
            >
              Week
            </button>
            <button
              style={buttonStyle(zoom === 0 ? '#3498db' : '#00375c')}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              onClick={() => handleZoom(0)}
            >
              Month
            </button>
    </div>
        </Zoom>
      </OptionsContainer>
    </Wrapper>
  );
};
export default Topbar;
