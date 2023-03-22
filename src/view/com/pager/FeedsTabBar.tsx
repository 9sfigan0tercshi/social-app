import React from 'react'
import {Animated, StyleSheet, TouchableOpacity} from 'react-native'
import {observer} from 'mobx-react-lite'
import {TabBar} from 'view/com/pager/TabBar'
import {RenderTabBarFnProps} from 'view/com/pager/Pager'
import {UserAvatar} from '../util/UserAvatar'
import {useStores} from 'state/index'
import {usePalette} from 'lib/hooks/usePalette'
import {useAnimatedValue} from 'lib/hooks/useAnimatedValue'

export const FeedsTabBar = observer(
  (props: RenderTabBarFnProps & {onPressSelected: () => void}) => {
    const store = useStores()
    const pal = usePalette('default')
    const interp = useAnimatedValue(0)

    React.useEffect(() => {
      Animated.timing(interp, {
        toValue: store.shell.minimalShellMode ? 1 : 0,
        duration: 100,
        useNativeDriver: true,
        isInteraction: false,
      }).start()
    }, [interp, store.shell.minimalShellMode])
    const transform = {
      transform: [{translateY: Animated.multiply(interp, -100)}],
    }

    const onPressAvi = React.useCallback(() => {
      store.shell.openDrawer()
    }, [store])

    return (
      <Animated.View style={[pal.view, styles.tabBar, transform]}>
        <TouchableOpacity style={styles.tabBarAvi} onPress={onPressAvi}>
          <UserAvatar avatar={store.me.avatar} size={30} />
        </TouchableOpacity>
        <TabBar
          {...props}
          items={['Following', "What's hot"]}
          indicatorPosition="bottom"
          indicatorColor={pal.colors.link}
        />
      </Animated.View>
    )
  },
)

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  tabBarAvi: {
    marginTop: 1,
    marginRight: 18,
  },
})