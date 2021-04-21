import boto3

def find_instances_by_tag(client, tag_key, tag_value=None):
    reservations  = client.describe_instances()['Reservations']

    targets = []

    for i in range(len(reservations)):
        instances = reservations[i]['Instances']
        for instance in instances:
            if "Tags" in instance:
                tags = instance['Tags']
                for tag in tags:
                    if tag['Key'] == tag_key:
                        if tag_value and tag['Value'] == tag_value:
                            targets.append(instance)
                        elif not tag_value:
                            targets.append(instance)
    return targets