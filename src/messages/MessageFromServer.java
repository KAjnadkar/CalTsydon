package messages;

public class MessageFromServer {
	private String greeting;
	
	public String getGreeting() {
		return greeting;
	}

	public void setGreeting(String greeting) {
		this.greeting = greeting;
	}

	public MessageFromServer(String g) {
		this.greeting = g;
	}
	
}
