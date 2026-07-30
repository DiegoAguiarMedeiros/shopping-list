import { FontAwesome } from "@expo/vector-icons";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "expo-router/build/react-navigation/stack";
import I18n from "i18n-js";
import { useState, useRef, SetStateAction } from "react";
import { TouchableHighlight, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Items from "../../app/Items";
import ItemsArchived from "../../app/ItemsArchived";
import ConfigScreen from "../../app/config";
import ProductTab from "../../app/product";
import Home from "../../app/home";
import { languageType, RoutesProps } from "../types/types";
import BottomNavigation from "../components/BottomNavigation";
import BottomSheet, { BottomSheetProps } from "../components/BottomSheet";
import HeaderInputTextSearch from "../components/HeaderInputTextSearch";
import NewListForm from "../components/NewListForm";
import NewProductForm from "../components/NewProductForm";
import NewTagForm from "../components/NewTagForm";
import AddProductOptions from "../components/AddProductOptions";
import Tags from "../../app/tags";
import { Title } from "../components/Text";
import History from "../../app/history";
import { IList } from "../Model/IList";
import { IProduct } from "../Model/IProduct";
import ITag from "../Model/ITag";
import { useStores } from "../context/StoreContext";
import getColorController from "../UseCases/Config/GetColor";
import getThemeController from "../UseCases/Config/GetTheme";

const Stack = createStackNavigator();


const Navigation: React.FC = () => {
  const { ListRepository, ProductRepository, TagRepository, ConfigRepository } = useStores();
  const stackRef = useRef<any>(null);
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const [activeRouteHeader, setActiveRouteHeader] = useState<{
    name: React.ReactNode;
    left: React.ReactNode | null;
    right: React.ReactNode | null;
  }>({
    left: null,
    name: <Title color={ConfigRepository.color.white}>Listas</Title>,
    right: null,
  });
  const [search, setSearch] = useState("");

  const handleCloseBottomSheetList = () => {
    setBottomSheetProps({
      children: (
        <NewListForm
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetList}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };
  const handleCloseBottomSheetProduct = () => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
        />
      ),
      height: "edit",
      isVisible: false,
    });
  };

  const handleCloseBottomSheetTag = () => {
    setBottomSheetProps({
      children: (
        <NewTagForm
          action="addTag"
          buttonText="add"
          onClose={handleCloseBottomSheetTag}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };

  const handleOpenProductAddOptions = () => {
    setBottomSheetProps({
      children: (
        <AddProductOptions
          onSelectProduct={() =>
            setBottomSheetProps({
              children: (
                <NewProductForm
                  action="addList"
                  buttonText="add"
                  onClose={handleCloseBottomSheetProduct}
                />
              ),
              height: "addProduct",
              isVisible: true,
            })
          }
          onSelectCategory={() =>
            setBottomSheetProps({
              children: (
                <NewTagForm
                  action="addTag"
                  buttonText="add"
                  onClose={handleCloseBottomSheetTag}
                />
              ),
              height: "addCategory",
              isVisible: true,
            })
          }
          onCancel={handleCloseBottomSheetProduct}
        />
      ),
      height: "options",
      isVisible: true,
    });
  };

  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    children: (
      <NewListForm
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheetList}
      />
    ),
    height: "add",
    isVisible: false,
  });

  const handleShowSearchInput = () => {
    setActiveRouteHeader({
      left: null,
      name: (
        <HeaderInputTextSearch
          style={{ marginLeft: -16 }}
          placeholder={I18n.t("search")}
          onChangeText={(item) => setSearch(item)}
        />
      ),
      right: (
        <TouchableHighlight
          underlayColor={ConfigRepository.color.secondary}
          style={{ marginRight: 20 }}
          onPress={() => clearHeaderProduct()}
        >
          <FontAwesome name="times" size={25} color={ConfigRepository.color.white} />
        </TouchableHighlight>
      ),
    });
  };

  const clearHeaderProduct = () => {
    setSearch("");
    setActiveRouteHeader({
      left: null,
      name: <Title color={ConfigRepository.color.white}>Produtos</Title>,
      right: (
        <TouchableHighlight
          underlayColor={ConfigRepository.color.primary}
          style={{ marginLeft: 20, marginRight: 20 }}
          onPress={() => handleShowSearchInput()}
        >
          <FontAwesome name="search" size={25} color={ConfigRepository.color.white} />
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
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetList}
        />
      ),
      product: (
        <NewProductForm
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
        />
      ),
      tags: (
        <NewTagForm
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
    if (route === "home") {

      if (ListRepository.listActive) {
        ProductRepository.setTagFilter(I18n.t("all"));
        ProductRepository.updateTotal();
        ProductRepository.updateTotalUn();
        ProductRepository.updateTotalWithAmount();
        ProductRepository.updateTotalWithoutAmount();
      }
      ListRepository.setListActiveNull();
    }
    if (route === "product") {
      TagRepository.setTagAcitveNull();
      ProductRepository.load();
      setSearch("");
      setActiveRouteHeader({
        left: null,
        name: <Title color={ConfigRepository.color.white}>{I18n.t("products")}</Title>,
        right: (
          <TouchableHighlight
            underlayColor={ConfigRepository.color.primary}
            style={{ marginLeft: 20, marginRight: 20 }}
            onPress={() => handleShowSearchInput()}
          >
            <FontAwesome name="search" size={25} color={ConfigRepository.color.white} />
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
    stackRef.current?.navigate(route);
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
          ? activeRoute === "product"
            ? handleOpenProductAddOptions()
            : setBottomSheetProps({ ...bottomSheetProps, isVisible: true })
          : null,
    },
    {
      name: "history",
      icon: "history",
      addButton: false,
      func: () => handleChangeRoute("history"),
    },
    {
      name: "config",
      icon: "gear",
      addButton: false,
      func: () => handleChangeRoute("config"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: ConfigRepository.color.primary,
          },
          headerTintColor: ConfigRepository.color.primary,
        }}
      >
        <Stack.Screen
          name={"home"}
          options={{
            headerLeft: () => null,
            headerRight: () => null,
            headerTitle: (props) => (
              <Title color={ConfigRepository.color.white}>{I18n.t("lists")}</Title>
            ),
          }}
        >
          {({ navigation }) => {
            stackRef.current = navigation;
            return <Home setBottomSheetProps={setBottomSheetProps} handleCloseBottomSheet={handleCloseBottomSheetList} />;
          }}
        </Stack.Screen>
        <Stack.Screen
          name={"product"}
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerRight: () => activeRouteHeader.right,
            headerTitle: () => activeRouteHeader.name,
          }}
        >
          {({ navigation }) => {
            stackRef.current = navigation;
            return <ProductTab search={search} setBottomSheetProps={setBottomSheetProps} handleCloseBottomSheet={handleCloseBottomSheetProduct} />;
          }}
        </Stack.Screen>
        <Stack.Screen
          name={"tags"}
          options={{
            headerLeft: () => null,
            headerTitle: (props) => (
              <Title color={ConfigRepository.color.white}>{I18n.t("categories")}</Title>
            ),
          }}
        >
          {({ navigation }) => {
            stackRef.current = navigation;
            return <Tags setBottomSheetProps={setBottomSheetProps} handleCloseBottomSheet={handleCloseBottomSheetTag} />;
          }}
        </Stack.Screen>
        <Stack.Screen
          name="Items"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {({ navigation }) => {
            stackRef.current = navigation;
            return <Items
              route={activeRoute}
              setActiveRouteHeader={setActiveRouteHeader}
              handleCloseBottomSheetList={handleCloseBottomSheetList}
            />;
          }}
        </Stack.Screen>
        <Stack.Screen
          name="ItemsArchived"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {({ navigation }) => {
            stackRef.current = navigation;
            return <ItemsArchived
              setActiveRouteHeader={setActiveRouteHeader}
              handleCloseBottomSheetList={handleCloseBottomSheetList} />;
          }}
        </Stack.Screen>
        <Stack.Screen
          name="history"
          options={{
            headerTitle: (props) => (
              <Title color={ConfigRepository.color.white}>{I18n.t("historic")}</Title>
            ),
            headerLeft: () => null,
          }}
        >
          {({ navigation }) => {
            stackRef.current = navigation;
            return <History />;
          }}
        </Stack.Screen>
        <Stack.Screen
          name="config"
          options={{
            headerTitle: (props) => (
              <Title color={ConfigRepository.color.white}>{I18n.t("settings")}</Title>
            ),
            headerLeft: () => (
              <TouchableHighlight
                underlayColor={ConfigRepository.color.primary}
                style={{ marginLeft: 20, marginRight: 10 }}
                onPress={() => {
                  setActiveRoute("home");
                  stackRef.current?.navigate("home");
                }}
              >
                <FontAwesome name="angle-left" size={35} color={ConfigRepository.color.white} />
              </TouchableHighlight>
            ),
          }}
        >
          {({ navigation }) => {
            stackRef.current = navigation;
            return <ConfigScreen />;
          }}
        </Stack.Screen>
        </Stack.Navigator>
      </View>
      <BottomSheet {...bottomSheetProps} />
      <SafeAreaView
        edges={["bottom"]}
        style={{ backgroundColor: ConfigRepository.color.backgroundBottomNavigation }}
      >
        <BottomNavigation
          routes={routes}
          active={activeRoute}
          setActiveRoute={setActiveRoute}
          setBottomSheetProps={setBottomSheetProps}
          bottomSheetProps={bottomSheetProps}
        />
      </SafeAreaView>
    </View>
  );
};

export default Navigation;
