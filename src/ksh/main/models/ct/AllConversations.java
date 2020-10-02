package ksh.main.models.ct;

import java.util.HashMap;
import java.util.Map;

public class AllConversations {

    private static AllConversations allConversationsInstance;

    private AllConversations(){
        allConversations = new HashMap<>();
    }

    public static AllConversations getAllChatsInstance(){
        if(allConversationsInstance == null)
            allConversationsInstance = new AllConversations();

        return allConversationsInstance;
    }

    public Map<String, Conversation> allConversations;
}
