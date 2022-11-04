import { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Menu } from "antd";

import { Category } from "../../../types";
import { groupBy, toCamelCase } from "../utils";
import { AddCategory } from "./AddCategory";
import { EditCategory } from "./EditCategory";

type Props = {
  categories: Array<Category>;
};

export const CategoryMenu = ({ categories }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const groupedCategories = groupBy(categories, ({ type }) => type);
  groupedCategories.EXPENSES = [
    ...groupedCategories.EXPENSES,
    { id: NaN, label: "+ Add expense category", type: "EXPENSES" },
  ];
  groupedCategories.INCOMES = [
    ...groupedCategories.INCOMES,
    { id: NaN, label: "+ Add income category", type: "INCOMES" },
  ];

  return (
    <>
      <Menu
        selectable={false}
        items={[
          {
            key: "categories",
            label: "Categories",
            icon: <UnorderedListOutlined />,
            children: Object.keys(groupedCategories).map((key) => ({
              key: toCamelCase(key),
              label: key.toUpperCase(),
              children: groupedCategories[key].map(({ label, id }) => ({
                label,
                key: `${key}-${id}`,
              })),
            })),
          },
        ]}
        mode="inline"
        onClick={({ key }) => {
          const [type, id] = key.split("-");
          const category = groupedCategories[type].find(({ id: categoryId }) => id === categoryId.toString());

          if (category) setSelectedCategory(category);
          setModalOpen(true);
        }}
      />
      {selectedCategory && Number.isNaN(selectedCategory.id) && (
        <AddCategory visible={modalOpen} type={selectedCategory.type} onClose={() => setModalOpen(false)} />
      )}
      {selectedCategory && !Number.isNaN(selectedCategory.id) && (
        <EditCategory visible={modalOpen} category={selectedCategory} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};
