import { reducers as login} from "../features/Login/reducers";
import { reducers as board} from "../features/Board/reducers";

export const rootReducer = {
    login,
    board
};
