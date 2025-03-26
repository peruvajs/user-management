import type { User } from "../types";

export const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];

  const fullDataCount = Math.min(count, 10000);

  for (let i = 1; i <= count; i++) {
    if (i <= fullDataCount) {
      users.push({
        id: i,
        firstName: `Имя${i}`,
        lastName: `Фамилия${i}`,
        age: 20 + (i % 40),
        email: `user${i}@example.com`,
        jobTitle:
          i % 5 === 0
            ? "Менеджер"
            : i % 4 === 0
            ? "Разработчик"
            : i % 3 === 0
            ? "Дизайнер"
            : i % 2 === 0
            ? "Аналитик"
            : "Тестировщик",
        department:
          i % 4 === 0
            ? "Маркетинг"
            : i % 3 === 0
            ? "Разработка"
            : i % 2 === 0
            ? "Продажи"
            : "HR",
        company:
          i % 3 === 0
            ? "ООО Компания1"
            : i % 2 === 0
            ? "АО Компания2"
            : "ИП Компания3",
      });
    } else {
      users.push({
        id: i,
        firstName: "",
        lastName: "",
        age: 22,
        email: `user${i}@example.com`,
        jobTitle: "",
        department: "",
        company: "",
      });
    }
  }

  return users;
};
