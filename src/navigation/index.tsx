import { FontAwesome } from "@expo/vector-icons";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { useRouter } from "expo-router";
import I18n from "i18n-js";
import { useState, useRef } from "react";
import { TouchableHighlight } from "react-native";
import Items from "../../app/Items";
import ItemsArchived from "../../app/ItemsArchived";
import ConfigScreen from "../../app/config";
import ProductTab from "../../app/product";
import { colorTheme, ColorList } from "../../constants/Colors";
import Home from "../../app/home";
import ProductsList from "../../app/ProductsList";
import { languageType, RoutesProps } from "../types/types";
import BottomNavigation from "../components/BottomNavigation";
import BottomSheet, { BottomSheetProps } from "../components/BottomSheet";
import HeaderInputTextSearch from "../components/HeaderInputTextSearch";
import NewListForm from "../components/NewListForm";
import NewProductForm from "../components/NewProductForm";
import NewTagForm from "../components/NewTagForm";
import Tags from "../../app/tags";
import { Title } from "../components/Text";
import History from "../../app/history";
import { IList } from "../Model/IList";
import { IProduct } from "../Model/IProduct";
import ITag from "../Model/ITag";

const Stack = createStackNavigator();

type NavigationProps = {
  color: colorTheme;
  currentColor: ColorList;
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  handleColorChange: (color: ColorList) => void;
  handleThemeChange: (theme: "light" | "dark") => void;
  currentTheme: "light" | "dark";
};

const Navigation: React.FC<NavigationProps> = ({
  color,
  currentColor,
  currentLanguage,
  handleLanguageChange,
  handleColorChange,
  handleThemeChange,
  currentTheme,
}) => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const [activeRouteHeader, setActiveRouteHeader] = useState<{
    name: React.ReactNode;
    left: React.ReactNode | null;
    right: React.ReactNode | null;
  }>({
    left: null,
    name: <Title color={color.white}>Listas</Title>,
    right: null,
  });
  const [search, setSearch] = useState("");

  const listRef = useRef<{ handleAddNewList: (uuid: string) => void } | null>(
    null
  );
  const tagRef = useRef<{
    handleAddNewTag: (uuid: ITag) => void;
    handleReloadTag(): void;
  } | null>(null);
  const listItemRef = useRef<{
    handleAddItem: (list: IList) => void;
  } | null>(null);

  const productListRef = useRef<{
    handleAddProduct: (product: IProduct) => void;
    handleReloadProduct: () => void;
  } | null>(null);
  const productRef = useRef<{
    handleAddProduct: (product: IProduct) => void;
    handleReloadProduct: () => void;
  } | null>(null);

  const handleCloseBottomSheetList = () => {
    setBottomSheetProps({
      children: (
        <NewListForm
          listRef={listRef}
          color={color}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetList}
        />
      ),
      height: "add",
      isVisible: false,
      color: color,
    });
  };
  const handleCloseBottomSheetProduct = () => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          color={color}
          productListRef={productRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
        />
      ),
      height: "edit",
      isVisible: false,
      color: color,
    });
  };
  const handleCloseBottomSheetProductWithTag = (tag: string) => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          color={color}
          productListRef={productListRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
          tagUuid={tag}
        />
      ),
      height: "add",
      isVisible: false,
      color: color,
    });
  };

  const handleCloseBottomSheetTag = () => {
    setBottomSheetProps({
      children: (
        <NewTagForm
          color={color}
          tagRef={tagRef}
          action="addTag"
          buttonText="add"
          onClose={handleCloseBottomSheetTag}
        />
      ),
      height: "add",
      isVisible: false,
      color: color,
    });
  };

  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    children: (
      <NewListForm
        listRef={listRef}
        color={color}
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheetList}
      />
    ),
    height: "add",
    isVisible: false,
    color: color,
  });

  const handleShowSearchInput = () => {
    setActiveRouteHeader({
      left: null,
      name: (
        <HeaderInputTextSearch
          color={color}
          style={{ marginLeft: -16 }}
          placeholder={I18n.t("search")}
          onChangeText={(item) => setSearch(item)}
        />
      ),
      right: (
        <TouchableHighlight
          underlayColor={color.secondary}
          style={{ marginRight: 20 }}
          onPress={() => clearHeaderProduct()}
        >
          <FontAwesome name="times" size={25} color={color.white} />
        </TouchableHighlight>
      ),
    });
  };

  const clearHeaderProduct = () => {
    setSearch("");
    setActiveRouteHeader({
      left: null,
      name: <Title color={color.white}>Produtos</Title>,
      right: (
        <TouchableHighlight
          underlayColor={color.primary}
          style={{ marginLeft: 20, marginRight: 20 }}
          onPress={() => handleShowSearchInput()}
        >
          <FontAwesome name="search" size={25} color={color.white} />
        </TouchableHighlight>
      ),
    });
  };

  const handleChangeRoute = (
    route: "home" | "product" | "tags" | "history" | "config"
  ): void => {
    const forms = {
      home: (
        <NewListForm
          listRef={listRef}
          color={color}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetList}
        />
      ),
      product: (
        <NewProductForm
          color={color}
          productListRef={productRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
        />
      ),
      tags: (
        <NewTagForm
          color={color}
          tagRef={tagRef}
          action="addTag"
          buttonText="add"
          onClose={handleCloseBottomSheetTag}
        />
      ),
    };

    if (route != "history" && route != "product" && route != "config") {
      setBottomSheetProps({
        ...bottomSheetProps,
        isVisible: false,
        height: "add",
        children: forms[route],
      });
    }
    if (route === "product") {
      setSearch("");
      setActiveRouteHeader({
        left: null,
        name: <Title color={color.white}>{I18n.t("products")}</Title>,
        right: (
          <TouchableHighlight
            underlayColor={color.primary}
            style={{ marginLeft: 20, marginRight: 20 }}
            onPress={() => handleShowSearchInput()}
          >
            <FontAwesome name="search" size={25} color={color.white} />
          </TouchableHighlight>
        ),
      });
      setBottomSheetProps({
        ...bottomSheetProps,
        isVisible: false,
        height: "edit",
        children: forms[route],
      });
    }

    if (route === "history" || route === "config") {
      setBottomSheetProps({
        ...bottomSheetProps,
        children: <></>,
        isVisible: false,
      });
    }
    setActiveRoute(route);
    router.push({ pathname: route });
  };

  const routes: RoutesProps[] = [
    {
      name: "home",
      icon: "shopping-bag",
      addButton: false,
      func: () => handleChangeRoute("home"),
    },
    {
      name: "product",
      icon: "cube",
      addButton: false,
      func: () => handleChangeRoute("product"),
    },
    {
      name: "add",
      icon: "plus",
      addButton: true,
      func: () =>
        activeRoute !== "history" && activeRoute !== "config"
          ? setBottomSheetProps({ ...bottomSheetProps, isVisible: true })
          : null,
    },
    {
      name: "tags",
      icon: "tags",
      addButton: false,
      func: () => handleChangeRoute("tags"),
    },
    {
      name: "history",
      icon: "history",
      addButton: false,
      func: () => handleChangeRoute("history"),
    },
  ];

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: color.primary,
          },
          headerTintColor: color.primary,
        }}
      >
        <Stack.Screen
          name={"home"}
          options={{
            headerLeft: () => null,
            headerRight: () => (
              <TouchableHighlight
                underlayColor={color.primary}
                style={{ marginLeft: 20, marginRight: 20 }}
                onPress={() => router.push({ pathname: "config" })}
              >
                <FontAwesome name="gear" size={25} color={color.white} />
              </TouchableHighlight>
            ),
            headerTitle: (props) => (
              <Title color={color.white}>{I18n.t("lists")}</Title>
            ),
          }}
        >
          {() => (
            <Home
              listItemRef={listItemRef}
              ref={listRef}
              color={color}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetList}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={"product"}
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerRight: () => activeRouteHeader.right,
            headerTitle: () => activeRouteHeader.name,
          }}
        >
          {() => (
            <ProductTab
              ref={productRef}
              color={color}
              search={search}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetProduct}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={"tags"}
          options={{
            headerLeft: () => null,
            headerTitle: (props) => (
              <Title color={color.white}>{I18n.t("categories")}</Title>
            ),
          }}
        >
          {() => (
            <Tags
              color={color}
              productListRef={productListRef}
              ref={tagRef}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetTag}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Items"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {() => (
            <Items
              ref={listItemRef}
              color={color}
              setActiveRouteHeader={setActiveRouteHeader}
              handleCloseBottomSheetList={handleCloseBottomSheetList}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ProductsList"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {() => (
            <ProductsList
              color={color}
              ref={productListRef}
              setActiveRouteHeader={setActiveRouteHeader}
              setBottomSheetProps={setBottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetProductWithTag}
              handleCloseBottomSheetTag={handleCloseBottomSheetTag}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ItemsArchived"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {() => (
            <ItemsArchived
              color={color}
              setActiveRouteHeader={setActiveRouteHeader}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="history"
          options={{
            headerTitle: (props) => (
              <Title color={color.white}>{I18n.t("historic")}</Title>
            ),
            headerLeft: () => null,
          }}
        >
          {() => <History color={color} />}
        </Stack.Screen>
        <Stack.Screen
          name="config"
          options={{
            headerTitle: (props) => (
              <Title color={color.white}>{I18n.t("settings")}</Title>
            ),
            headerLeft: () => (
              <TouchableHighlight
                underlayColor={color.primary}
                style={{ marginLeft: 20, marginRight: 10 }}
                onPress={() => router.push({ pathname: "home" })}
              >
                <FontAwesome name="angle-left" size={35} color={color.white} />
              </TouchableHighlight>
            ),
          }}
        >
          {() => (
            <ConfigScreen
              handleChangeRoute={handleChangeRoute}
              currentTheme={currentTheme}
              color={color}
              currentLanguage={currentLanguage}
              currentColor={currentColor}
              handleColorChange={handleColorChange}
              handleLanguageChange={handleLanguageChange}
              handleThemeChange={handleThemeChange}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <BottomSheet {...bottomSheetProps} color={color} />
      <BottomNavigation
        color={color}
        routes={routes}
        active={activeRoute}
        setActiveRoute={setActiveRoute}
        setBottomSheetProps={setBottomSheetProps}
        bottomSheetProps={bottomSheetProps}
      />
    </>
  );
};

export default Navigation;
