package ksh.main.ct.dao;

import ksh.main.models.ct.Conversation;

public interface ConversationDao {

	void saveConversation(Conversation c);
	Conversation findConversation(long id);
}
