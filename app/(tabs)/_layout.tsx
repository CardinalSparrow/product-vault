import { useProducts } from "@/context/ProductContext";
import { Colors } from "@/utils/theme";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

function VaultTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Text style={styles.iconEmoji}>📦</Text>
    </View>
  );
}

function AddTabIcon({ focused }: { focused: boolean }) {
  const { isAtLimit } = useProducts();
  return (
    <View
      style={[
        styles.addIconWrap,
        focused && styles.addIconWrapActive,
        isAtLimit && styles.addIconDisabled,
      ]}
    >
      <Text
        style={[styles.addIconText, isAtLimit && styles.addIconTextDisabled]}
      >
        +
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Vault",
          tabBarIcon: ({ focused }) => <VaultTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Product",
          tabBarIcon: ({ focused }) => <AddTabIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 64,
    paddingBottom: 10,
    paddingTop: 6,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: Colors.accentMuted,
  },
  iconEmoji: {
    fontSize: 16,
  },
  addIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  addIconWrapActive: {
    backgroundColor: Colors.accentDim,
  },
  addIconDisabled: {
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  addIconText: {
    fontSize: 22,
    color: Colors.textInverse,
    lineHeight: 26,
    fontWeight: "300",
  },
  addIconTextDisabled: {
    color: Colors.textDisabled,
  },
});
