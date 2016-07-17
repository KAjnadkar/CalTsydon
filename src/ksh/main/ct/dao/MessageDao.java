package ksh.main.ct.dao;

import java.util.ArrayList;

import ksh.main.models.ct.Message;

public interface MessageDao {
	void saveMessage(Message m);
	ArrayList<Message> getMessagesForConverationId(String id);	
}
