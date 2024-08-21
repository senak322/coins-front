import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store"; // Импортируем AppDispatch

// Создание своего собственного хука для диспетчеризации действий с типизацией
export const useAppDispatch = () => useDispatch<AppDispatch>();