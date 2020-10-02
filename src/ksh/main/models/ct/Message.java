package ksh.main.models.ct;

public class Message {


	public String message;

    public Long timestamp;

    public String userName;

	public Message(){
		this.message = "";
		this.timestamp = -1L;
		this.userName = "";
	}

	public Message(String message, String userName, Long timestamp) {
		this.message = message;
		this.timestamp = timestamp;
		this.userName = userName;
	}


	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String toString(){
	    StringBuilder stringBuilder = new StringBuilder();
	    stringBuilder.append(timestamp + "\t");
	    stringBuilder.append(userName + "\t");
	    stringBuilder.append(message + "\t");
	    return  stringBuilder.toString();
    }

}
