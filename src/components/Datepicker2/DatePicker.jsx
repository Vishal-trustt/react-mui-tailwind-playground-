import React, { useEffect, useMemo, useRef } from "react";
import "./styles.css";

const WheelPickerComponent = ({
  yearItems,
  yearValue,
  onYearChange,
  monthItems,
  monthValue,
  onMonthChange,
  dayItems,
  dayValue,
  onDayChange,
  containerHeight = 210,
  itemHeight = 32,
}) => {
  const yearItemsContRef = useRef();
  const monthItemsContRef = useRef();
  const dayItemsContRef = useRef();
  const isScrolling = useRef(false);
  const yearRefs = useRef([]);
  const monthRefs = useRef([]);
  const dayRefs = useRef([]);

  const yearItemsMap = useMemo(
    () =>
      yearItems?.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map()
      ),
    [yearItems]
  );
  const currentYearValue = useRef(yearItemsMap.get(yearValue) ?? 0);

  const monthItemsMap = useMemo(
    () =>
      monthItems?.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map()
      ),
    [monthItems]
  );
  const currentMonthValue = useRef(monthItemsMap.get(monthValue) ?? 0);

  const dayItemsMap = useMemo(
    () =>
      dayItems?.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map()
      ),
    [dayItems]
  );
  const currentDayValue = useRef(dayItemsMap.get(dayValue) ?? 0);

  const visibleItemsCount = Math.floor(containerHeight / itemHeight);
  const offset = Math.round((visibleItemsCount + 1) / 2) + 1;
  const maxScrollOffset = (containerHeight - itemHeight) / 2;

  function rerenderElements(
    refs,
    selectedElement,
    scrollTop,
    firstItemIndex,
    lastItemIndex,
    itemHeight,
    maxScrollOffset
  ) {
    if (refs.current) {
      refs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const [div] = item?.getElementsByTagName("div");
          div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
          div.style.transformOrigin = "center";
        });
    }
  }

  useEffect(() => {
    let isAnimating = false;

    function handleScroll(event, refs, items, currentValueRef, handleChange) {
      if (!isAnimating) {
        isAnimating = true;

        requestAnimationFrame(() => {
          const scrollTop = Math.max(event.target.scrollTop, 0);
          const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / itemHeight), 0),
            items?.length - 1
          );
          window.clearTimeout(isScrolling.current);
          rerenderElements(
            refs,
            selectedElement,
            scrollTop,
            Math.max(selectedElement - offset, 0),
            Math.min(selectedElement + offset, items?.length),
            itemHeight,
            maxScrollOffset
          );

          currentValueRef.current = selectedElement;
          isScrolling.current = setTimeout(function () {
            handleChange(items[selectedElement].value);
          }, 20);

          isAnimating = false;
        });
      }
    }

    function addScrollListener(
      ref,
      refs,
      items,
      currentValueRef,
      handleChange
    ) {
      const handleScrollWithRefs = (event) =>
        handleScroll(event, refs, items, currentValueRef, handleChange);

      ref.current?.addEventListener("scroll", handleScrollWithRefs);
      refs.current[currentValueRef.current]?.scrollIntoView({
        block: "center",
      });
      rerenderElements(
        refs,
        currentValueRef.current,
        ref.current?.scrollTop,
        0,
        items?.length,
        itemHeight,
        maxScrollOffset
      );

      return () => {
        ref.current?.removeEventListener("scroll", handleScrollWithRefs);
      };
    }

    const removeYearScrollListener = addScrollListener(
      yearItemsContRef,
      yearRefs,
      yearItems,
      currentYearValue,
      onYearChange
    );
    const removeMonthScrollListener = addScrollListener(
      monthItemsContRef,
      monthRefs,
      monthItems,
      currentMonthValue,
      onMonthChange
    );
    const removeDayScrollListener = addScrollListener(
      dayItemsContRef,
      dayRefs,
      dayItems,
      currentDayValue,
      onDayChange
    );

    return () => {
      removeYearScrollListener();
      removeMonthScrollListener();
      removeDayScrollListener();
    };
  }, [
    yearItemsContRef.current,
    monthItemsContRef.current,
    dayItemsContRef.current,
    onYearChange,
    onMonthChange,
    onDayChange,
    itemHeight,
    maxScrollOffset,
    offset,
    yearItems,
    monthItems,
    dayItems,
  ]);

  useEffect(() => {
    const index = yearItemsMap.get(yearValue);
    if (index !== currentYearValue.current) {
      currentYearValue.current = index;
      yearRefs.current[index]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      rerenderElements(
        yearRefs,
        currentYearValue.current,
        yearItemsContRef.current?.scrollTop,
        0,
        yearItems?.length,
        itemHeight,
        maxScrollOffset
      );
    }
  }, [yearValue, yearItemsMap, itemHeight, maxScrollOffset, yearItems]);

  useEffect(() => {
    const index = monthItemsMap.get(monthValue);
    if (index !== currentMonthValue.current) {
      currentMonthValue.current = index;
      monthRefs.current[index]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      rerenderElements(
        monthRefs,
        currentMonthValue.current,
        monthItemsContRef.current?.scrollTop,
        0,
        monthItems?.length,
        itemHeight,
        maxScrollOffset
      );
    }
  }, [monthValue, monthItemsMap, itemHeight, maxScrollOffset, monthItems]);

  useEffect(() => {
    const index = dayItemsMap.get(dayValue);
    if (index !== currentDayValue.current) {
      currentDayValue.current = index;
      dayRefs.current[index]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      rerenderElements(
        dayRefs,
        currentDayValue.current,
        dayItemsContRef.current?.scrollTop,
        0,
        dayItems?.length,
        itemHeight,
        maxScrollOffset
      );
    }
  }, [dayValue, dayItemsMap, itemHeight, maxScrollOffset, dayItems]);

  return (
    <div
      className="container"
      style={{
        height: `${containerHeight}px`,
        // height: "100%",
        width: "100%",
      }}
    >
      <ul className="items w-full" ref={yearItemsContRef}>
        {yearItems?.map((item, index) => (
          <li
            className="item"
            key={item.value}
            ref={(node) => (yearRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
      <ul className="items" ref={monthItemsContRef}>
        {monthItems?.map((item, index) => (
          <li
            className="item"
            key={item.value}
            ref={(node) => (monthRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
      <ul className="items" ref={dayItemsContRef}>
        {dayItems?.map((item, index) => (
          <li
            className="item"
            key={item.value}
            ref={(node) => (dayRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}
          >
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const WheelPicker = React.memo(WheelPickerComponent);
